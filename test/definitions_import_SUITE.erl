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
%% Copyright (c) 2016 Pivotal Software, Inc.  All rights reserved.
%%

%% This test suite covers the definitions import function
%% outside of the context of HTTP API (e.g. when definitions are
%% imported on boot).

-module(definitions_import_SUITE).

-include_lib("common_test/include/ct.hrl").
-include_lib("rabbit_common/include/rabbit.hrl").
-include_lib("eunit/include/eunit.hrl").

-compile(export_all).

all() ->
    [
     {group, non_parallel_tests}
    ].

groups() ->
    [
     {non_parallel_tests, [], [
                               %% Note: to make it easier to see which case failed,
                               %% these are intentionally not folded into a single case.
                               %% If generation becomes an alternative worth considering for these tests,
                               %% we'll just add a case that drives PropEr.
                               import_case1,
                               import_case2,
                               import_case3,
                               import_case4,
                               import_case5,
                               import_case6,
                               import_case7,
                               import_case8
                              ]}
    ].

%% -------------------------------------------------------------------
%% Test suite setup/teardown.
%% -------------------------------------------------------------------

init_per_suite(Config) ->
    rabbit_ct_helpers:log_environment(),
    inets:start(),
    Config1 = rabbit_ct_helpers:set_config(Config, [
                                                    {rmq_nodename_suffix, ?MODULE}
                                                   ]),
    rabbit_ct_helpers:run_setup_steps(Config1,
                      rabbit_ct_broker_helpers:setup_steps() ++
                      rabbit_ct_client_helpers:setup_steps()).
end_per_suite(Config) ->
    rabbit_ct_helpers:run_teardown_steps(Config,
                                         rabbit_ct_client_helpers:teardown_steps() ++
                                             rabbit_ct_broker_helpers:teardown_steps()).

init_per_group(_, Config) ->
    Config.

end_per_group(_, Config) ->
    Config.

init_per_testcase(Testcase, Config) ->
    rabbit_ct_helpers:testcase_started(Config, Testcase).

end_per_testcase(Testcase, Config) ->
    rabbit_ct_helpers:testcase_finished(Config, Testcase).

%%
%% Tests
%%

import_case1(Config) -> import_case(Config, "case1").
import_case2(Config) -> import_case(Config, "case2").
import_case3(Config) -> import_case(Config, "case3").
import_case4(Config) -> import_case(Config, "case4").
import_case6(Config) -> import_case(Config, "case6").
import_case7(Config) -> import_case(Config, "case7").
import_case8(Config) -> import_case(Config, "case8").

import_case5(Config) ->
    import_case(Config, "case5"),
    ?assertEqual(rabbit_ct_broker_helpers:rpc(Config, 0,
                                              rabbit_runtime_parameters, value_global,
                                              [mqtt_port_to_vhost_mapping]),
                 %% expect a proplist, see #528
                 [{<<"1883">>,<<"/">>},
                  {<<"1884">>,<<"vhost2">>}]).

import_case(Config, CaseName) ->
    CasePath = filename:join(?config(data_dir, Config), CaseName ++ ".json"),
    rabbit_ct_broker_helpers:rpc(Config, 0, ?MODULE, run_import_case, [CasePath]),
    ok.

run_import_case(Path) ->
    {ok, Body} = file:read_file(Path),
    ct:pal("Successfully loaded a definition to import from ~p~n", [Path]),
    rabbit_mgmt_wm_definitions:apply_defs(Body, ?INTERNAL_USER,
                                          fun ()  -> ct:pal("Import case ~p succeeded~n",  [Path]) end,
                                          fun (E) -> ct:pal("Import case ~p failed: ~p~n", [Path, E]),
                                                     ct:fail({failure, Path, E}) end).
