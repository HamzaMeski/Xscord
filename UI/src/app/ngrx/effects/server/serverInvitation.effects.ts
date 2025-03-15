import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServerService} from "../../../core/services/restfull/backend/server.service";
import {
	sendServerInvitation,
	sendServerInvitationError,
	sendServerInvitationSuccess
} from "../../actions/server/serverInvitation.actions";
import {catchError, map, mergeMap, of} from "rxjs";


@Injectable()
export class ServerInvitationEffects {
	sendServerInvitation$

	constructor(
		private actions$: Actions,
		private serverService: ServerService
	) {
		this.sendServerInvitation$ = createEffect(() =>
			this.actions$.pipe(
				ofType(sendServerInvitation),
				mergeMap(({request}) => {
					return this.serverService.sendServerJoinInvitation(request).pipe(
						map(response=> {
							return sendServerInvitationSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(sendServerInvitationError({error}))
						})
					)
				})
			)
		)
	}
}
