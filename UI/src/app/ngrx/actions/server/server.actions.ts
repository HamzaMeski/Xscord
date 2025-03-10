import {createAction, props} from "@ngrx/store";
import {ServerRequest, ServerResponse} from "../../../core/types/server/server.types";


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

