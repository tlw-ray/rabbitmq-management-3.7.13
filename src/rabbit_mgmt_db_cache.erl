%% the contents of this file are subject to the mozilla public license
%% version 1.1 (the "license"); you may not use this file except in
%% compliance with the license. you may obtain a copy of the license at
%% http://www.mozilla.org/mpl/
%%
%% software distributed under the license is distributed on an "as is"
%% basis, without warranty of any kind, either express or implied. see the
%% license for the specific language governing rights and limitations
%% under the license.
%%
%% Copyright (c) 2016-2018 Pivotal Software, Inc. All rights reserved.

-module(rabbit_mgmt_db_cache).

-behaviour(gen_server).

%% API functions
-export([start_link/1]).
-export([process_name/1,
         fetch/2,
         fetch/3,
         fetch/4]).

%% gen_server callbacks
-export([init/1,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         terminate/2,
         code_change/3]).

-record(state, {data :: any() | none,
                args :: [any()],
                timer_ref :: undefined | timer:tref(),
                multiplier :: integer()}).

-type error_desc() :: key_not_found | timeout | {throw, atom()}.
-type fetch_fun() :: fun((_) -> any()) | fun(() -> any()).
-type fetch_ret() :: {ok, any()} | {error, error_desc()}.

-define(DEFAULT_MULT, 5).
-define(DEFAULT_TIMEOUT, 60000).
-define(CHILD(Key), {rabbit_mgmt_db_cache:process_name(Key),
                     {rabbit_mgmt_db_cache, start_link, [Key]},
                                     permanent, 5000, worker,
                                     [rabbit_mgmt_db_cache]}).
-define(RESET_STATE(State), State#state{data = none, args = []}).

%% Implements an adaptive cache that times the value generating fun
%% and uses the return value as the cached value for the time it took
%% to produce multiplied by some factor (defaults to 5).
%% There is one cache process per key. New processes are started as
%% required. The cache is invalidated if the arguments to the fetch
%% fun have changed.


%%%===================================================================
%%% API functions
%%%===================================================================

-spec fetch(atom(), fetch_fun()) -> fetch_ret().
fetch(Key, FetchFun) ->
    fetch(Key, FetchFun, []).

-spec fetch(atom(), fetch_fun(), [any()]) -> fetch_ret().
fetch(Key, FetchFun, Args) when is_list(Args) ->
    fetch(Key, FetchFun, Args, ?DEFAULT_TIMEOUT).

-spec fetch(atom(), fetch_fun(), [any()], integer()) -> fetch_ret().
fetch(Key, FetchFun, FunArgs, Timeout) ->
    ProcName = process_name(Key),
    Pid = case whereis(ProcName) of
            undefined ->
                {ok, P} = supervisor:start_child(rabbit_mgmt_db_cache_sup,
                                                 ?CHILD(Key)),
                P;
            P -> P
          end,
    gen_server:call(Pid, {fetch, FetchFun, FunArgs}, Timeout).


-spec process_name(atom()) -> atom().
process_name(Key) ->
    list_to_atom(atom_to_list(?MODULE) ++ "_" ++ atom_to_list(Key)).

-spec start_link(atom()) -> {ok, pid()} | ignore | {error, any()}.
start_link(Key) ->
    gen_server:start_link({local, process_name(Key)}, ?MODULE, [], []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

init([]) ->
    Mult = application:get_env(rabbitmq_management, management_db_cache_multiplier,
                               ?DEFAULT_MULT),
    {ok, #state{data = none,
                args = [],
                multiplier = Mult}}.

handle_call({fetch, FetchFun, FunArgs}, _From,
            #state{data = CachedData, args = Args,
                   multiplier = Mult, timer_ref = Ref} = State) when
     CachedData =:= none orelse Args =/= FunArgs ->
    _ = timer:cancel(Ref),

    try timer:tc(FetchFun, FunArgs) of
        {Time, Data} ->
            case trunc(Time / 1000 * Mult) of
                0 -> {reply, {ok, Data}, ?RESET_STATE(State)}; % no need to cache that
                T ->
                    {ok, TimerRef} = timer:send_after(T, self(), purge_cache),
                    {reply, {ok, Data}, State#state{data = Data,
                                                    timer_ref = TimerRef,
                                                    args = FunArgs}}
            end
    catch
        Throw -> {reply, {error, {throw, Throw}}, State}
    end;
handle_call({fetch, _FetchFun, _}, _From, #state{data = Data} = State) ->
    Reply = {ok, Data},
    {reply, Reply, State};
handle_call(purge_cache, _From, State) ->
    {reply, ok, ?RESET_STATE(State)}.


handle_cast(_Msg, State) ->
    {noreply, State}.

handle_info(purge_cache, State) ->
    {noreply, ?RESET_STATE(State)};
handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.
