import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServerService} from "../../../core/services/restfull/backend/server.service";
import {
	acceptServerInvitation,
	acceptServerInvitationError,
	acceptServerInvitationSuccess,
	getMemberJoinedServers,
	getMemberJoinedServersError,
	getMemberJoinedServersSuccess,
	getReceiverInvitations,
	getReceiverInvitationsError,
	getReceiverInvitationsSuccess,
	getServerMembers, getServerMembersError,
	getServerMembersSuccess,
	sendServerInvitation,
	sendServerInvitationError,
	sendServerInvitationSuccess
} from "../../actions/server/serverInvitation.actions";
import {catchError, map, mergeMap, of} from "rxjs";


@Injectable()
export class ServerInvitationEffects {
	sendServerInvitation$
    getReceiverInvitations$
	acceptServerInvitation$
	serverMembers$
	memberJoinedServers$

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

		this.getReceiverInvitations$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getReceiverInvitations),
				mergeMap(({receiverId}) => {
					return this.serverService.getReceiverInvitations(receiverId).pipe(
						map(response=> {
							return getReceiverInvitationsSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getReceiverInvitationsError({error}))
						})
					)
				})
			)
		)

		this.acceptServerInvitation$ = createEffect(() =>
			this.actions$.pipe(
				ofType(acceptServerInvitation),
				mergeMap(({request}) => {
					return this.serverService.acceptRequest(request).pipe(
						map(response=> {
							return acceptServerInvitationSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(acceptServerInvitationError({error}))
						})
					)
				})
			)
		)

		this.serverMembers$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getServerMembers),
				mergeMap(({serverId}) => {
					return this.serverService.getServerMembers(serverId).pipe(
						map(response=> {
							return getServerMembersSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getServerMembersError({error}))
						})
					)
				})
			)
		)

		this.memberJoinedServers$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getMemberJoinedServers),
				mergeMap(({}) => {
					return this.serverService.getMemberJoinedServers().pipe(
						map(response=> {
							return getMemberJoinedServersSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getMemberJoinedServersError({error}))
						})
					)
				})
			)
		)
	}
}
