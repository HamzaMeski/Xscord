import {createAction, props} from "@ngrx/store";
import {peerMessageRequest, peerMessageResponse} from "../../../core/types/peerChat/peerChat.types";


// websocket connection
export const connectToChat = createAction(
	'[Peer Chat] Connect To Chat'
)
export const disconnectFromChat = createAction(
	'[Peer Chat] Disconnect From Chat'
)
export const connectionEstablished = createAction(
	'[Peer Chat] Connection Established'
)
export const connectionLost = createAction(
	'[Peer Chat] Connection Lost'
)


// send a message
export const sendMessage = createAction(
	'[Peer Chat] Send A Message',
	props<{request: peerMessageRequest}>()
)

// receive a message
export const receiveMessage = createAction(
	'[Peer Chat] Receive A Message',
	props<{response: peerMessageResponse}>()
)

// load chat history
export const loadChatHistory= createAction(
	'[Peer Chat] Load Chat History',
	props<{individual2Id: number}>()
)

export const loadChatHistorySuccess = createAction(
	'[Peer Chat] Load Chat History Success',
	props<{response: peerMessageResponse[]}>()
)

// Reading a message
/*
export const markMessageAsRead = createAction(
	'[Peer Chat] Mark Message As Read',
	props<{messageId: number}>()
)
*/

