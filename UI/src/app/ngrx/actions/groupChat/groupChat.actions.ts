import {createAction, props} from "@ngrx/store";
import {groupMessageRequest, groupMessageResponse} from "../../../core/types/groupChat/groupChat.types";


// send a message
export const sendGroupMessage = createAction(
	'[Group Chat] Send A Message',
	props<{request: groupMessageRequest}>()
)

export const addSenderGroupMessageToConversation = createAction(
	'[Group Chat] Add Sender Group Message To Conversation',
	props<{expectedResponse: groupMessageResponse}>()
)

// receive a message
export const receiveGroupMessage = createAction(
	'[Group Chat] Receive A Group Message',
	props<{response: groupMessageResponse}>()
)

// load group messages
export const loadGroupMessages= createAction(
	'[Group Chat] Load Group Messages',
	props<{groupId: number}>()
)

export const loadGroupMessagesSuccess = createAction(
	'[Group Chat] Load Group Messages Success',
	props<{response: groupMessageResponse[]}>()
)

export const loadGroupMessagesFailure = createAction(
	'[Group Chat] Load Group Messages Failure',
	props<{error: string}>()
)
