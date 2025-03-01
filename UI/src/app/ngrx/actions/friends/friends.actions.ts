import {createAction, props} from "@ngrx/store";
import {FriendRowResponse, FriendShipDemandResponse} from "../../../core/types/friends /friends.types";

// send friend request
export const friendShipDemand = createAction(
	'[Friends] Send Friend Request',
	props<{receiverId: number}>()
)

export const friendShipDemandSuccess = createAction(
	'[Friends] Send Friend Request Success',
	props<{ response: FriendShipDemandResponse }>()
)

export const friendShipDemandFailure = createAction(
	'[Friends] Send Friend Request Failure',
	props<{ error: string }>()
)


// get all pending requests
export const getPendingRequests = createAction(
	'[Friends] Get Pending Requests'
)

export const getPendingRequestsSuccess = createAction(
	'[Friends] Get Pending Requests Success',
	props<{response: FriendShipDemandResponse[]}>()
)

export const getPendingRequestsFailure = createAction(
	'[Friends] Get Pending Requests Failure',
	props<{error: string}>()
)



// accept friend request
export const acceptFriendShipReq =createAction(
	'[Friends] Accept Pending Request',
	props<{requestId: number}>()
)

export const acceptFriendShipReqSuccess =createAction(
	'[Friends] Accept Pending Request Success',
	props<{response: FriendShipDemandResponse}>()
)

export const acceptFriendShipReqFailure =createAction(
	'[Friends] Accept Pending Request Failure',
	props<{error: string}>()
)


// ignore friend request
export const ignoreFriendShipReq =createAction(
	'[Friends] Ignore Pending Request',
	props<{requestId: number}>()
)

export const ignoreFriendShipReqSuccess =createAction(
	'[Friends] Ignore Pending Request Success'
)

export const ignoreFriendShipReqFailure =createAction(
	'[Friends] Ignore Pending Request Failure',
	props<{error: string}>()
)


// get all friends of individual
export const getIndividualFriends = createAction(
	'[Friends] Get Individual Friends'
)

export const getIndividualFriendsSuccess = createAction(
	'[Friends] Get Individual Friends Success',
	props<{response: FriendRowResponse[]}>()
)

export const getIndividualFriendsFailure = createAction(
	'[Friends] Get Individual Friends Failure',
	props<{error: string}>()
)


// load selected friend
export const loadSelectedFriend = createAction(
	'[Friend] Load Selected Friend',
	props<{friendId: number}>()
)

export const loadSelectedFriendSuccess = createAction(
	'[Friend] Load Selected Friend Success',
	props<{friendId: number}>()
)

export const loadSelectedFriendFailure = createAction(
	'[Friend] Load Selected Friend Failure',
	props<{friendId: number}>()
)