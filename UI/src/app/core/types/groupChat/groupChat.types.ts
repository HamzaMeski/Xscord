import {IndividualResponse} from "../individual/individual.types";
import {GroupResponse} from "../group/group.types";

export interface groupMessageRequest {
	groupId: number,
	content: string,
}

export interface groupMessageResponse {
	id: number,
	sender: IndividualResponse,
	group: GroupResponse,
	content: string,
	createdAt: Date,
	updatedAt: Date
}
