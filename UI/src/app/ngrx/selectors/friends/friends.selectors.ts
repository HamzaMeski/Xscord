import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
	FriendShipDemandState, IndividualFriendsState,
	PendingRequestsState
} from "../../state/friends/friends.state";


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


// accept pending request
export const selectAcceptFriendShipReqState = createFeatureSelector<FriendShipDemandState>('acceptFriendShipReq')

export const selectAcceptFriendShipReqResponse = createSelector(
	selectAcceptFriendShipReqState,
	(state: FriendShipDemandState)=> state.friendShipDemand
)

export const selectAcceptFriendShipReqLoading = createSelector(
	selectAcceptFriendShipReqState,
	(state: FriendShipDemandState)=> state.loading
)

export const selectAcceptFriendShipReqError = createSelector(
	selectAcceptFriendShipReqState,
	(state: FriendShipDemandState)=> state.error
)


// ignore pending request
export const selectIgnoreFriendShipReqState = createFeatureSelector<FriendShipDemandState>('ignoreFriendShipReq')

export const selectIgnoreFriendShipReqResponse = createSelector(
	selectIgnoreFriendShipReqState,
	(state: FriendShipDemandState)=> state.friendShipDemand
)

export const selectIgnoreFriendShipReqLoading = createSelector(
	selectIgnoreFriendShipReqState,
	(state: FriendShipDemandState)=> state.loading
)

export const selectIgnoreFriendShipReqError = createSelector(
	selectIgnoreFriendShipReqState,
	(state: FriendShipDemandState)=> state.error
)



// get all friends of individual
export const selectIndividualFriendsState = createFeatureSelector<IndividualFriendsState>('getIndividualFriends')

export const selectGetIndividualFriendsResponse = createSelector(
	selectIndividualFriendsState,
	(state: IndividualFriendsState)=> state.friends
)

export const selectGetIndividualFriendsLoading = createSelector(
	selectIndividualFriendsState,
	(state: IndividualFriendsState)=> state.loading
)

export const selectGetIndividualFriendsError = createSelector(
	selectIndividualFriendsState,
	(state: IndividualFriendsState)=> state.error
)
