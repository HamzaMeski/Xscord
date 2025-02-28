import {
	initialAcceptFriendShipReqState,
	initialFriendShipDemandState, initialIgnoreFriendShipReqState, initialIndividualFriendsState,
	initialPendingRequestsState
} from "../../state/friends/friends.state";
import {createReducer, on} from "@ngrx/store";
import {
	acceptFriendShipReq,
	acceptFriendShipReqFailure,
	acceptFriendShipReqSuccess,
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess,
	getIndividualFriends,
	getIndividualFriendsFailure,
	getIndividualFriendsSuccess,
	getPendingRequests,
	getPendingRequestsFailure,
	getPendingRequestsSuccess,
	ignoreFriendShipReq,
	ignoreFriendShipReqFailure,
	ignoreFriendShipReqSuccess
} from "../../actions/friends/friends.actions";


// send friend request
export const friendShipDemandReducers = createReducer(
	initialFriendShipDemandState,

	on(friendShipDemand, (state) => ({
		...state,
		friendShipDemand: null,
		loading: true,
		error: null
	})),

	on(friendShipDemandSuccess, (state, action) => ({
		...state,
		friendShipDemand: action.response,
		loading: false,
		error: null
	})),

	on(friendShipDemandFailure, (state, action) => ({
		...state,
		friendShipDemand: null,
		loading: false,
		error: action.error
	}))
)



// get all pending requests
export const pendingRequestsReducers = createReducer(
	initialPendingRequestsState,

	on(getPendingRequests, (state) => ({
		...state,
		pendingRequests: null,
		loading: true,
		error: null
	})),

	on(getPendingRequestsSuccess, (state, action) => ({
		...state,
		pendingRequests: action.response,
		loading: false,
		error: null
	})),

	on(getPendingRequestsFailure, (state, action) => ({
		...state,
		pendingRequests: null,
		loading: false,
		error: action.error
	}))
)


// accept friend request
export const acceptFriendShipReqReducers = createReducer(
	initialAcceptFriendShipReqState,

	on(acceptFriendShipReq, (state) => ({
		...state,
		friendShipDemand: null,
		loading: true,
		error: null
	})),

	on(acceptFriendShipReqSuccess, (state, action) => ({
		...state,
		friendShipDemand: action.response,
		loading: false,
		error: null
	})),

	on(acceptFriendShipReqFailure, (state, action) => ({
		...state,
		friendShipDemand: null,
		loading: false,
		error: action.error
	})),
)



// ignore friend request
export const ignoreFriendShipReqReducers = createReducer(
	initialIgnoreFriendShipReqState,

	on(ignoreFriendShipReq, (state) => ({
		...state,
		friendShipDemand: null,
		loading: true,
		error: null
	})),

	on(ignoreFriendShipReqSuccess, (state) => ({
		...state,
		friendShipDemand: null,
		loading: false,
		error: null
	})),

	on(ignoreFriendShipReqFailure, (state, action) => ({
		...state,
		friendShipDemand: null,
		loading: false,
		error: action.error
	})),
)


// get all friends of individual
export const getIndividualFriendsReducers = createReducer(
	initialIndividualFriendsState,

	on(getIndividualFriends, (state) => ({
		...state,
		friends: null,
		loading: true,
		error: null
	})),

	on(getIndividualFriendsSuccess, (state, action) => ({
		...state,
		friends: action.response,
		loading: false,
		error: null
	})),

	on(getIndividualFriendsFailure, (state, action) => ({
		...state,
		friends: null,
		loading: false,
		error: action.error
	}))
)

