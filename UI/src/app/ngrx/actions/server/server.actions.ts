import {createAction, props} from "@ngrx/store";
import {ServerRequest, ServerResponse} from "../../../core/types/server/server.types";


// create a server
export const createServer = createAction(
	'[Server] Create Server',
	props<{request: ServerRequest}>()
)

export const createServerSuccess = createAction(
	'[Server] Create Server Success',
	props<{response: ServerResponse}>()
)

export const createServerFailure = createAction(
	'[Server] Create Server Failure',
	props<{error: string}>()
)

// get individual servers
export const getIndividualServers = createAction(
	'[Server] Get Individual Servers'
)

export const getIndividualServersSuccess = createAction(
	'[Server] Get Individual Servers Success',
	props<{response: ServerResponse[]}>()
)

export const getIndividualServersFailure = createAction(
	'[Server] Get Individual Servers Failure',
	props<{error: string}>()
)

// get server
export const getServer = createAction(
	'[Server] Get Server',
	props<{serverId: number}>()
)

export const getServerSuccess = createAction(
	'[Server] Get Server Success',
	props<{response: ServerResponse}>()
)

export const getServerFailure = createAction(
	'[Server] Get Server Failure',
	props<{error: string}>()
)
