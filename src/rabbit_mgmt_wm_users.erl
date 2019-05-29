%% The contents of this file are subject to the Mozilla Public License
%% Version 1.1 (the "License"); you may not use this file except in
%% compliance with the License. You may obtain a copy of the License at
%% http://www.mozilla.org/MPL/
%%
%% Software distributed under the License is distributed on an "AS IS"
%% basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
%% License for the specific language governing rights and limitations
%% under the License.
%%
%% The Original Code is RabbitMQ Management Plugin.
%%
%% The Initial Developer of the Original Code is GoPivotal, Inc.
%% Copyright (c) 2007-2018 Pivotal Software, Inc.  All rights reserved.
%%

-module(rabbit_mgmt_wm_users).

-export([init/2, to_json/2,
         content_types_provided/2,
         is_authorized/2, allowed_methods/2]).
-export([variances/2]).
-export([users/1]).

-import(rabbit_misc, [pget/2]).

-include_lib("rabbitmq_management_agent/include/rabbit_mgmt_records.hrl").
-include_lib("rabbit_common/include/rabbit.hrl").

%%--------------------------------------------------------------------

init(Req, [Mode]) ->
    {cowboy_rest, rabbit_mgmt_headers:set_common_permission_headers(Req, ?MODULE), {Mode, #context{}}}.

variances(Req, Context) ->
    {[<<"accept-encoding">>, <<"origin">>], Req, Context}.

content_types_provided(ReqData, Context) ->
   {rabbit_mgmt_util:responder_map(to_json), ReqData, Context}.

allowed_methods(ReqData, Context) ->
    {[<<"HEAD">>, <<"GET">>, <<"OPTIONS">>], ReqData, Context}.

to_json(ReqData, {Mode, Context}) ->
    rabbit_mgmt_util:reply_list(users(Mode), ReqData, Context).

is_authorized(ReqData, {Mode, Context}) ->
    {Res, Req2, Context2} = rabbit_mgmt_util:is_authorized_admin(ReqData, Context),
    {Res, Req2, {Mode, Context2}}.

%%--------------------------------------------------------------------

users(all) ->
    [begin
         {ok, User} = rabbit_auth_backend_internal:lookup_user(pget(user, U)),
         rabbit_mgmt_format:internal_user(User)
     end || U <- rabbit_auth_backend_internal:list_users()];
users(without_permissions) ->
    lists:foldl(fun(U, Acc) ->
                        Username = pget(user, U),
                        case rabbit_auth_backend_internal:list_user_permissions(Username) of
                            [] ->
                                {ok, User} = rabbit_auth_backend_internal:lookup_user(Username),
                                [rabbit_mgmt_format:internal_user(User) | Acc];
                            _ ->
                                Acc
                        end
                end, [], rabbit_auth_backend_internal:list_users()).
