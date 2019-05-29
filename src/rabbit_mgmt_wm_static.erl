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
%% Copyright (c) 2010-2015 Pivotal Software, Inc.  All rights reserved.
%%

%% Alias for cowboy_static that accepts a list of directories
%% where static files can be found.

-module(rabbit_mgmt_wm_static).

-include_lib("kernel/include/file.hrl").

-export([init/2]).
-export([malformed_request/2]).
-export([forbidden/2]).
-export([content_types_provided/2]).
-export([resource_exists/2]).
-export([last_modified/2]).
-export([generate_etag/2]).
-export([get_file/2]).


init(Req, [{App, Path}]) ->
    do_init(Req, App, Path);
init(Req, [{App, Path}|Tail]) ->
    PathInfo = cowboy_req:path_info(Req),
    Filepath = filename:join([code:priv_dir(App), Path|PathInfo]),
    %% We use erl_prim_loader because the file may be inside an .ez archive.
    FileInfo = erl_prim_loader:read_file_info(binary_to_list(Filepath)),
    case FileInfo of
        {ok, #file_info{type = regular}} -> do_init(Req, App, Path);
        {ok, #file_info{type = symlink}} -> do_init(Req, App, Path);
        _                                -> init(Req, Tail)
    end.

do_init(Req, App, Path) ->
    cowboy_static:init(Req, {priv_dir, App, Path}).

malformed_request(Req, State) ->
    cowboy_static:malformed_request(Req, State).

forbidden(Req, State) ->
    cowboy_static:forbidden(Req, State).

content_types_provided(Req, State) ->
    cowboy_static:content_types_provided(Req, State).

resource_exists(Req, State) ->
    cowboy_static:resource_exists(Req, State).

last_modified(Req, State) ->
    cowboy_static:last_modified(Req, State).

generate_etag(Req, State) ->
    cowboy_static:generate_etag(Req, State).

get_file(Req, State) ->
    cowboy_static:get_file(Req, State).
