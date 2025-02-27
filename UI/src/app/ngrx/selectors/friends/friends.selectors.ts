import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FriendShipDemandState} from "../../state/friends/friends.state";


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