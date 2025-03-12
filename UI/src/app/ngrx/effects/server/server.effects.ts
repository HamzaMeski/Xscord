import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServerService} from "../../../core/services/restfull/backend/server.service";
import {
	createServer,
	createServerFailure,
	createServerSuccess,
	getIndividualServers, getIndividualServersFailure, getIndividualServersSuccess
} from "../../actions/server/server.actions";
import {catchError, map, mergeMap, of} from "rxjs";


@Injectable()
export class ServerEffects {
	createServer$
	getIndividualServers$

	constructor(
		private actions$: Actions,
		private serverService: ServerService
	) {
		this.createServer$ = createEffect(() =>
			this.actions$.pipe(
				ofType(createServer),
				mergeMap(({request}) => {
					return this.serverService.createServer(request).pipe(
						map(response => {
							return createServerSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(createServerFailure({error}))
						})
					)}
				)
			)
		)

		this.getIndividualServers$ = createEffect(()=>
			this.actions$.pipe(
				ofType(getIndividualServers),
				mergeMap(()  =>
					this.serverService.getIndividualServers().pipe(
						map(response => {
							return getIndividualServersSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getIndividualServersFailure({error}))
						})
					)
				)
			)
		)
	}
}