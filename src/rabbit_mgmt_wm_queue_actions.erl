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
%% Copyright (c) 2011-2012 GoPivotal, Inc.  All rights reserved.
%%

-module(rabbit_mgmt_wm_queue_actions).

-export([init/2, resource_exists/2, is_authorized/2,
         allowed_methods/2, content_types_accepted/2, accept_content/2]).
-export([variances/2]).

-include_lib("rabbitmq_management_agent/include/rabbit_mgmt_records.hrl").
-include_lib("amqp_client/include/amqp_client.hrl").

%%--------------------------------------------------------------------

init(Req, _State) ->
    {cowboy_rest, rabbit_mgmt_headers:set_common_permission_headers(Req, ?MODULE), #context{}}.

variances(Req, Context) ->
    {[<<"accept-encoding">>, <<"origin">>], Req, Context}.

allowed_methods(ReqData, Context) ->
    {[<<"POST">>, <<"OPTIONS">>], ReqData, Context}.

resource_exists(ReqData, Context) ->
    {case rabbit_mgmt_wm_queue:queue(ReqData) of
         not_found -> false;
         _         -> true
     end, ReqData, Context}.

content_types_accepted(ReqData, Context) ->
   {[{'*', accept_content}], ReqData, Context}.

accept_content(ReqData, Context) ->
    rabbit_mgmt_util:post_respond(do_it(ReqData, Context)).

do_it(ReqData0, Context) ->
    VHost = rabbit_mgmt_util:vhost(ReqData0),
    QName = rabbit_mgmt_util:id(queue, ReqData0),
    rabbit_mgmt_util:with_decode(
      [action], ReqData0, Context,
      fun([Action], _Body, ReqData) ->
              rabbit_amqqueue:with(
                rabbit_misc:r(VHost, queue, QName),
                fun(Q) -> action(Action, Q, ReqData, Context) end)
      end).

is_authorized(ReqData, Context) ->
    rabbit_mgmt_util:is_authorized_admin(ReqData, Context).

%%--------------------------------------------------------------------

action(<<"sync">>, #amqqueue{pid = QPid}, ReqData, Context) ->
    spawn(fun() -> rabbit_amqqueue:sync_mirrors(QPid) end),
    {true, ReqData, Context};

action(<<"cancel_sync">>, #amqqueue{pid = QPid}, ReqData, Context) ->
    _ = rabbit_amqqueue:cancel_sync_mirrors(QPid),
    {true, ReqData, Context};

action(Else, _Q, ReqData, Context) ->
    rabbit_mgmt_util:bad_request({unknown, Else}, ReqData, Context).
