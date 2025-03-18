import {createFeatureSelector, createSelector} from "@ngrx/store";
import {groupMessagesState} from "../../state/groupChat/groupChat.state";


export const selectGroupMessagesState = createFeatureSelector<groupMessagesState>('getGroupMessages')
export const selectGroupMessagesResponse = createSelector(
	selectGroupMessagesState,
	(state: groupMessagesState)=>state.messages
)
export const selectGroupMessagesLoading = createSelector(
	selectGroupMessagesState,
	(state: groupMessagesState)=>state.loading
)
export const selectGroupMessagesError = createSelector(
	selectGroupMessagesState,
	(state: groupMessagesState)=>state.error
)
