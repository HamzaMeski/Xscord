import {FriendShipDemandResponse} from "../../../core/types/friends /friends.types";


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