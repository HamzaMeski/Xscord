import {peerMessageResponse} from "../../../core/types/peerChat/peerChat.types";


// peerChat connection
export interface PeerChatConnectionSate {
	connected: boolean,
	loading: boolean,
	error: string | null
}

export const initialPeerChatConnectionSate: PeerChatConnectionSate = {
	connected: false,
	loading: false,
	error: null
}

// peerChat history
export interface PeerChatHistoryState {
	conversation: peerMessageResponse[],
	loading: boolean,
	error: string | null
}

export const initialPeerChatHistory: PeerChatHistoryState = {
	conversation: [],
	loading: false,
	error: null
}
