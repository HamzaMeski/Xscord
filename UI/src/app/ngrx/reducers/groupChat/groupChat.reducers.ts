import {createReducer, on} from "@ngrx/store";
import {initialGroupMessages} from "../../state/groupChat/groupChat.state";
import {
	addSenderGroupMessageToConversation, loadGroupMessages,
	loadGroupMessagesFailure,
	loadGroupMessagesSuccess,
	receiveGroupMessage
} from "../../actions/groupChat/groupChat.actions";


export const groupMessagesReducer = createReducer(
	initialGroupMessages,

	on(addSenderGroupMessageToConversation, (state, action) =>({
		...state,
		messages: [
			...state.messages,
			action.expectedResponse
		]
	})),

	on(receiveGroupMessage, (state, action) => ({
		...state,
		messages: [...state.messages, action.response]
	})),


	on(loadGroupMessages, (state) => ({
		...state,
		messages: [],
		loading: true,
		error: null
	})),

	on(loadGroupMessagesSuccess, (state, action) => ({
		...state,
		messages: action.response,
		loading: false,
		error: null,
	})),

	on(loadGroupMessagesFailure, (state, action) => ({
		...state,
		messages: [],
		loading: false,
		error: action.error
	})),
)
