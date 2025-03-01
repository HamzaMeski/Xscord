import {peerMessageResponse} from "../../../core/types/peerChat/peerChat.types";

export interface PeerChatState {
	conversation: peerMessageResponse[],
	loading: boolean,
	error: string | null,
	connected: boolean
}

export const initialPeerChatState: PeerChatState = {
	conversation: [],
	loading: false,
	error: null,
	connected: false
}