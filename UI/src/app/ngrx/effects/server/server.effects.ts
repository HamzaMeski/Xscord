import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServerService} from "../../../core/services/restfull/backend/server.service";
import {
	createServer,
	createServerFailure,
	createServerSuccess,
	getIndividualServers,
	getIndividualServersFailure,
	getIndividualServersSuccess,
	getServer,
	getServerFailure,
	getServerSuccess
} from "../../actions/server/server.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {Store} from "@ngrx/store";


@Injectable()
export class ServerEffects {
	createServer$
	getIndividualServers$
	getIndividualServersSuccess$

	getServer$

	constructor(
		private actions$: Actions,
		private serverService: ServerService,
		private store: Store
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

		this.getIndividualServersSuccess$ = createEffect(()=>
			this.actions$.pipe(
				ofType(createServerSuccess),
				tap(()=> this.store.dispatch(getIndividualServers()))
			),
			{dispatch:false}
		)

		this.getServer$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getServer),
				mergeMap(({serverId})=> {
					return this.serverService.getServer(serverId).pipe(
						map(response=> {
							return getServerSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getServerFailure({error}))
						})
					)
				})
			)
		)
	}
}