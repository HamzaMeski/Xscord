import {IndividualResponse} from "../individual/individual.types";

export interface FriendShipDemandResponse {
	id: number,
	requester: IndividualResponse,
	createdAt: Date
}

export interface FriendRowResponse {
	 id: number,
	 individual1: IndividualResponse,
	 individual2: IndividualResponse,
	 createdAt: Date
}
