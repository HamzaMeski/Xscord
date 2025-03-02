import {
	FriendRowResponse,
	FriendShipDemandResponse
} from "../../../core/types/friends /friends.types";
import {IndividualResponse} from "../../../core/types/individual/individual.types";

// send friend request
export interface FriendShipDemandState {
	friendShipDemand: FriendShipDemandResponse | null,
	loading: boolean,
	error: string | null
}

export const initialFriendShipDemandState: FriendShipDemandState = {
	friendShipDemand: null,
	loading: false,
	error: null
}


// get all pending requests
export interface PendingRequestsState {
	pendingRequests: FriendShipDemandResponse[] | null,
	loading: boolean,
	error: string | null
}

export const initialPendingRequestsState: PendingRequestsState ={
	pendingRequests: null,
	loading: false,
	error: null
}


// accept friend request
export const initialAcceptFriendShipReqState: FriendShipDemandState = {
	friendShipDemand: null,
	loading: false,
	error: null
}


// ignore friend request
export const initialIgnoreFriendShipReqState: FriendShipDemandState = {
	friendShipDemand: null,
	loading: false,
	error: null
}


// get all friends of individual
export interface IndividualFriendsState {
	friends: FriendRowResponse[] | null,
	loading: boolean,
	error: string | null
}

export const initialIndividualFriendsState: IndividualFriendsState = {
	friends: null,
	loading: false,
	error: null
}


// load selected friend
export interface SelectedFriendState {
	friend: IndividualResponse | null,
	loading: boolean,
	error: string | null
}

export const initialSelectedFriendState: SelectedFriendState = {
	friend: null,
	loading: false,
	error: null
}
