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


export const getReceiverInvitations = createAction(
	'[Receiver Invitations] Get Receiver Invitations',
	props<{receiverId: number}>()
)
export const getReceiverInvitationsSuccess = createAction(
	'[Receiver Invitations] Get Receiver Invitations Success',
	props<{response: ServerJoinDemandResponse[]}>()
)
export const getReceiverInvitationsError = createAction(
	'[Receiver Invitations] Get Receiver Invitations Error',
	props<{error: string}>()
)


export const acceptServerInvitation = createAction(
	'[Server Invitation] Accept Invitation',
	props<{request: {serverId: number, receiverId: number}}>()
)
export const acceptServerInvitationSuccess = createAction(
	'[Server Invitation] Accept Invitation Success',
	props<{response: ServerJoinDemandResponse}>()
)
export const acceptServerInvitationError = createAction(
	'[Server Invitation] Accept Invitation Error',
	props<{error: string}>()
)
