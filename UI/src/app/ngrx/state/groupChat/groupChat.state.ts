import {groupMessageResponse} from "../../../core/types/groupChat/groupChat.types";

export interface groupMessagesState {
	messages: groupMessageResponse[],
	loading: boolean,
	error: string | null
}

export const initialGroupMessages: groupMessagesState = {
	messages: [],
	loading: false,
	error: null
}
