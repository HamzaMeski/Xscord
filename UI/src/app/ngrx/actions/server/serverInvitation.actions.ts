import {createAction, props} from "@ngrx/store";
import {ServerJoinDemandRequest, ServerJoinDemandResponse} from "../../../core/types/server/serverJoinDemand.types";
import {IndividualResponse} from "../../../core/types/individual/individual.types";


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


export const getServerMembers = createAction(
	'[Server Members] Get Server Members',
	props<{serverId: number}>()
)
export const getServerMembersSuccess = createAction(
	'[Server Members] Get Server Members Success',
	props<{response: IndividualResponse[]}>()
)
export const getServerMembersError = createAction(
	'[Server Members] Get Server Members Error',
	props<{error: string}>()
)