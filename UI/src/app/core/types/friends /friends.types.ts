import {UserProfileResponse} from "../userProfile/userProfiles.types";

export interface FriendShipDemandResponse {
	id: number,
	requester: UserProfileResponse,
	createdAt: Date
}

export interface FriendRowResponse {
	 id: number,
	 individual1: UserProfileResponse,
	 individual2: UserProfileResponse,
	 createdAt: Date
}
