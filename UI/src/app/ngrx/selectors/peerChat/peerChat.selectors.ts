import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
	PeerChatConnectionSate,
	PeerChatHistoryState
} from "../../state/peerChat/peerChat.state";


// peerChat connection
export const selectPeerChatConnectionSate = createFeatureSelector<PeerChatConnectionSate>('peerChatConnection')

export const selectMeIsConnected = createSelector(
	selectPeerChatConnectionSate,
	(state: PeerChatConnectionSate)=> state.connected
)


// peerChat history
export const selectPeerChatHistoryState = createFeatureSelector<PeerChatHistoryState>('peerChatHistory')

export const selectPeerChatHistoryConversation = createSelector(
	selectPeerChatHistoryState,
	(state: PeerChatHistoryState)=>state.conversation
)

export const selectPeerChatHistoryLoading = createSelector(
	selectPeerChatHistoryState,
	(state: PeerChatHistoryState)=>state.loading
)

export const selectPeerChatHistoryError = createSelector(
	selectPeerChatHistoryState,
	(state: PeerChatHistoryState)=>state.error
)
