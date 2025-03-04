import {createReducer, on} from "@ngrx/store";
import {
	initialPeerChatConnectionSate,
	initialPeerChatHistory,
} from "../../state/peerChat/peerChat.state";
import {
	addSenderMessageToConversation,
	connectionEstablished,
	connectToChat, loadChatHistoryFailure,
	loadChatHistorySuccess,
	receiveMessage, sendMessage
} from "../../actions/peerChat/peerChat.actions";


// peerChat connection
export const peerChatConnectionReducers = createReducer(
	initialPeerChatConnectionSate,

	on(connectToChat, (state) => ({
		...state,
		loading: true
	})),

	on(connectionEstablished, (state) => ({
		...state,
		loading: false,
		connected: true
	})),
)


// peerChat history
export const peerChatHistoryReducers = createReducer(
	initialPeerChatHistory,

	on(addSenderMessageToConversation, (state, action) =>({
		...state,
		conversation: [
			...state.conversation,
			action.expectedResponse
		]
	})),

	on(receiveMessage, (state, action) => ({
		...state,
		conversation: [...state.conversation,action.response]
	})),

	on(loadChatHistorySuccess, (state, action) => ({
		...state,
		conversation: action.response
	})),

	on(loadChatHistoryFailure, (state, action) => ({
		...state,
		error: action.error
	})),
)
