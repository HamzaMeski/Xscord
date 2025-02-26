import {initialFriendShipDemandState} from "../../state/friends/friends.state";
import {createReducer, on} from "@ngrx/store";
import {
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess
} from "../../actions/friends/friends.actions";


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
