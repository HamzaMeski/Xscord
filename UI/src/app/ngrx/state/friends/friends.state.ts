import {FriendShipDemandResponse} from "../../../core/types/friends /friends.types";

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
