import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PeerChatSocketService} from "../../../core/services/socket/peerChatSocket.service";
import {PeerChatRestService} from "../../../core/services/restfull/backend/peerChatRest.service";
import {
	connectToChat,
	loadChatHistory, loadChatHistoryFailure,
	loadChatHistorySuccess,
	sendMessage
} from "../../actions/peerChat/peerChat.actions";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {sendGroupMessage} from "../../actions/groupChat/groupChat.actions";


@Injectable()
export class PeerChatEffects {
	sendGroupMessage$
	loadGroupMessages$

	constructor(
		private actions$: Actions,
		private peerChatSocketService: PeerChatSocketService,
		private peerChatRestService: PeerChatRestService,
	) {

		this.sendGroupMessage$ = createEffect(() =>
				this.actions$.pipe(
					ofType(sendGroupMessage),
					switchMap(({request})=> {
						return this.peerChatSocketService.sendMessage(request.receiverId, request.content)
					})
				),
			{
				dispatch: false
			}
		)


		this.loadGroupMessages$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadChatHistory),
				mergeMap(({individual2Id}) =>
					this.peerChatRestService.getChatHistory(individual2Id).pipe(
						map(response => {
							console.log('loadChatHistory effect')
							return loadChatHistorySuccess({response})
						}),
						catchError(err =>{
							const error: string = err.error.message
							return of(loadChatHistoryFailure({error}))
						})
					)
				)
			)
		)

	}
}