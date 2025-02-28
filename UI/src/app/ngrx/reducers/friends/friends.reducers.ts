import {
	initialAcceptFriendShipReqState,
	initialFriendShipDemandState,
	initialPendingRequestsState
} from "../../state/friends/friends.state";
import {createReducer, on} from "@ngrx/store";
import {
	acceptFriendShipReq, acceptFriendShipReqFailure, acceptFriendShipReqSuccess,
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess, getPendingRequests, getPendingRequestsFailure, getPendingRequestsSuccess
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
