import {createReducer, on} from "@ngrx/store";
import {initialPeerChatState} from "../../state/peerChat/peerChat.state";
import {
	connectionEstablished,
	connectToChat, loadChatHistoryFailure,
	loadChatHistorySuccess,
	receiveMessage
} from "../../actions/peerChat/peerChat.actions";


export const peerChatReducers = createReducer(
	initialPeerChatState,

	on(connectToChat, (state) => ({
		...state,
		loading: true
	})),

	on(connectionEstablished, (state) => ({
		...state,
		loading: false,
		connected: true
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