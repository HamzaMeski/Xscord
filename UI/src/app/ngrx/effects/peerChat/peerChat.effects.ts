import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PeerChatSocketService} from "../../../core/services/socket/peerChatSocket.service";
import {
	connectToChat,
	loadChatHistory,
	loadChatHistoryFailure,
	loadChatHistorySuccess,
	sendMessage
} from "../../actions/peerChat/peerChat.actions";
import {catchError, map, mergeMap, of, switchMap, tap} from "rxjs";
import {PeerChatRestService} from "../../../core/services/restfull/backend/peerChatRest.service";


@Injectable()
export class PeerChatEffects {
	connectToChat$
	sendMessage$
	loadChatHistory$

	constructor(
		private actions$: Actions,
		private peerChatSocketService: PeerChatSocketService,
		private peerChatRestService: PeerChatRestService,
	) {
		this.connectToChat$ = createEffect(() =>
			this.actions$.pipe(
				ofType(connectToChat),
				switchMap(()=> {
					return this.peerChatSocketService.connect()
				})
			),
			{
				dispatch: false
			}
		)

		this.sendMessage$ = createEffect(() =>
			this.actions$.pipe(
				ofType(sendMessage),
				switchMap(({request})=> {
					return this.peerChatSocketService.sendMessage(request.receiverId, request.content)
				})
			),
			{
				dispatch: false
			}
		)


		this.loadChatHistory$ = createEffect(() =>
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