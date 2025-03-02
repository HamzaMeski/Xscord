import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PeerChatState} from "../../state/peerChat/peerChat.state";

// peerChat selector
export const selectPeerChatState = createFeatureSelector<PeerChatState>('peerChat')

export const selectPeerChatConversation = createSelector(
	selectPeerChatState,
	(state: PeerChatState)=>state.conversation
)

export const selectPeerChatLoading = createSelector(
	selectPeerChatState,
	(state: PeerChatState)=>state.loading
)

export const selectLoadChatHistoryError = createSelector(
	selectPeerChatState,
	(state: PeerChatState)=>state.error
)
