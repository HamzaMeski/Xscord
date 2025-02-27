import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FriendShipDemandState, PendingRequestsState} from "../../state/friends/friends.state";


// send friend request
export const selectFriendShipDemandState = createFeatureSelector<FriendShipDemandState>('friendShipDemand')

export const selectFriendShipDemandResponse = createSelector(
	selectFriendShipDemandState,
	(state: FriendShipDemandState)=> state.friendShipDemand
)

export const selectFriendShipDemandLoading = createSelector(
	selectFriendShipDemandState,
	(state: FriendShipDemandState)=> state.loading
)

export const selectFriendShipDemandError = createSelector(
	selectFriendShipDemandState,
	(state: FriendShipDemandState)=> state.error
)



// get all pending requests
export const selectPendingRequestsState = createFeatureSelector<PendingRequestsState>('pendingRequests')

export const selectPendingRequestsResponse = createSelector(
	selectPendingRequestsState,
	(state: PendingRequestsState) => state.pendingRequests
)

export const selectPendingRequestsLoading = createSelector(
	selectPendingRequestsState,
	(state: PendingRequestsState) => state.loading
)

export const selectPendingRequestsError = createSelector(
	selectPendingRequestsState,
	(state: PendingRequestsState) => state.error
)