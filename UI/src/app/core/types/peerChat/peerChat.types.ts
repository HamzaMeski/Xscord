import {IndividualResponse} from "../individual/individual.types";

export interface peerMessageRequest {
	receiverId: number,
	content: string,
}

export interface peerMessageResponse {
	id: number,
	sender: IndividualResponse,
	receiver: IndividualResponse,
	content: string,
	isRead: boolean,
	createdAt: Date,
	updatedAt: Date
}