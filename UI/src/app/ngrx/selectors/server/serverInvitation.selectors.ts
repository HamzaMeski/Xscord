import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ServerInvitationState} from "../../state/server/serverInvitation.state";


export const selectSendServerInvitationState = createFeatureSelector<ServerInvitationState['send']>('sendServerInvitation')
export const selectSendServerInvitationResponse = createSelector(
	selectSendServerInvitationState,
	(state: ServerInvitationState['send'])=>state.invitationResponse
)
export const selectSendServerInvitationLoading = createSelector(
	selectSendServerInvitationState,
	(state: ServerInvitationState['send'])=>state.loading
)
export const selectSendServerInvitationError = createSelector(
	selectSendServerInvitationState,
	(state: ServerInvitationState['send'])=>state.error
)



export const selectReceiverInvitationsState = createFeatureSelector<ServerInvitationState['receiverInvitations']>('getReceiverInvitations')
export const selectReceiverInvitationsResponse = createSelector(
	selectReceiverInvitationsState,
	(state: ServerInvitationState['receiverInvitations'])=> state.invitationsResponse
)
export const selectReceiverInvitationsLoading = createSelector(
	selectReceiverInvitationsState,
	(state: ServerInvitationState['receiverInvitations'])=> state.loading
)
export const selectReceiverInvitationsError = createSelector(
	selectReceiverInvitationsState,
	(state: ServerInvitationState['receiverInvitations'])=> state.error
)



export const selectAcceptServerInvitationState = createFeatureSelector<ServerInvitationState['accept']>('acceptServerInvitation')
export const selectAcceptServerInvitationResponse = createSelector(
	selectAcceptServerInvitationState,
	(state: ServerInvitationState['accept'])=>state.invitationResponse
)
export const selectAcceptServerInvitationLoading = createSelector(
	selectAcceptServerInvitationState,
	(state: ServerInvitationState['accept'])=>state.loading
)
export const selectAcceptServerInvitationError = createSelector(
	selectAcceptServerInvitationState,
	(state: ServerInvitationState['accept'])=>state.error
)


