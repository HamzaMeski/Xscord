import {UserProfileResponse} from "../userProfile/userProfiles.types";

export interface FriendShipDemandResponse {
	id: number,
	requester: UserProfileResponse,
	createdAt: Date
}
