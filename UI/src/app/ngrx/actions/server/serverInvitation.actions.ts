import {createAction, props} from "@ngrx/store";
import {ServerJoinDemandRequest, ServerJoinDemandResponse} from "../../../core/types/server/serverJoinDemand.types";


export const sendServerInvitation = createAction(
	'[Server Invitation] Send Invitation',
	props<{request: ServerJoinDemandRequest}>()
)

export const sendServerInvitationSuccess = createAction(
	'[Server Invitation] Send Invitation Success',
	props<{response: ServerJoinDemandResponse}>()
)

export const sendServerInvitationError = createAction(
	'[Server Invitation] Send Invitation Error',
	props<{error: string}>()
)
