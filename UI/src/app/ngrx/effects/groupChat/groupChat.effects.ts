import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {
	loadGroupMessages,
	loadGroupMessagesFailure,
	loadGroupMessagesSuccess,
	sendGroupMessage
} from "../../actions/groupChat/groupChat.actions";
import {GroupChatSocketService} from "../../../core/services/socket/groupChatSocket.service";
import {GroupChatService} from "../../../core/services/restfull/backend/groupChat.service";
import {getGroup, getGroupError, getGroupSuccess} from "../../actions/group/group.actions";
import {GroupService} from "../../../core/services/restfull/backend/group.service";


@Injectable()
export class GroupChatEffects {
	sendGroupMessage$
	loadGroupMessages$
	getGroup$

	constructor(
		private actions$: Actions,
		private groupChatSocketService: GroupChatSocketService,
		private groupChatService: GroupChatService,
		private groupService: GroupService
	) {

		this.sendGroupMessage$ = createEffect(() =>
				this.actions$.pipe(
					ofType(sendGroupMessage),
					switchMap(({request})=> {
						return this.groupChatSocketService.sendMessage(request.groupId, request.content)
					})
				),
			{
				dispatch: false
			}
		)


		this.loadGroupMessages$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadGroupMessages),
				mergeMap(({groupId}) =>
					this.groupChatService.getGroupMessages(groupId).pipe(
						map(response => {
							return loadGroupMessagesSuccess({response})
						}),
						catchError(err =>{
							const error: string = err.error.message
							return of(loadGroupMessagesFailure({error}))
						})
					)
				)
			)
		)

		this.getGroup$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getGroup),
				mergeMap(({groupId}) =>
					this.groupService.getGroup(groupId).pipe(
						map(response => {
							return getGroupSuccess({response})
						}),
						catchError(err =>{
							const error: string = err.error.message
							return of(getGroupError({error}))
						})
					)
				)
			)
		)
	}
}