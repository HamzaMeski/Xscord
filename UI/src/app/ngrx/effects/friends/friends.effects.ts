import {Injectable} from "@angular/core";
import {
	acceptFriendShipReq,
	acceptFriendShipReqFailure,
	acceptFriendShipReqSuccess,
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess,
	getIndividualFriends,
	getIndividualFriendsFailure,
	getIndividualFriendsSuccess,
	getPendingRequests,
	getPendingRequestsFailure,
	getPendingRequestsSuccess,
	ignoreFriendShipReq,
	ignoreFriendShipReqFailure,
	ignoreFriendShipReqSuccess
} from "../../actions/friends/friends.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FriendsService} from "../../../core/services/fetch/friends.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {Store} from "@ngrx/store";


@Injectable()
export class FriendsEffects {
	friendShipDemand$
	pendingRequests$
	acceptFriendShipReq$
	refreshPendingRequests$
	ignoreFriendShipReq$
	individualFriends$

	constructor(
		private actions$: Actions,
		private friendsService: FriendsService,
		private store: Store
	) {
		// send friend request
		this.friendShipDemand$ = createEffect(() =>
			this.actions$.pipe(
				ofType(friendShipDemand),
				mergeMap(({receiverId}) =>
					this.friendsService.sendFriendShipRequest(receiverId).pipe(
						map(response => {
							return friendShipDemandSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(friendShipDemandFailure({error}))
						})
					)
				)
			)
		)

		// get all pending requests
		this.pendingRequests$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getPendingRequests),
				mergeMap(() =>
					this.friendsService.getPendingRequests().pipe(
						map(response => {
							console.log('pending requests (effects):')
							console.log(response)
							return getPendingRequestsSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getPendingRequestsFailure({error}))
						})
					)
				)
			)
		)

		// accept friend request
		this.acceptFriendShipReq$ = createEffect(() =>
			this.actions$.pipe(
				ofType(acceptFriendShipReq),
				mergeMap(({requestId}) =>
					this.friendsService.acceptRequest(requestId).pipe(
						map(response => {
							return acceptFriendShipReqSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(acceptFriendShipReqFailure({error}))
						})
					)
				)
			)
		)

		// ignore friend request
		this.ignoreFriendShipReq$ = createEffect(() =>
			this.actions$.pipe(
				ofType(ignoreFriendShipReq),
				mergeMap(({requestId}) =>
					this.friendsService.ignoreRequest(requestId).pipe(
						map(() => {
							return ignoreFriendShipReqSuccess()
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(ignoreFriendShipReqFailure({error}))
						})
					)
				)
			)
		)


		// refresh pending requests after success acceptation
		this.refreshPendingRequests$ = createEffect(() =>
				this.actions$.pipe(
					ofType(
						acceptFriendShipReqSuccess,
						ignoreFriendShipReqSuccess
					),
					tap(() => this.store.dispatch(getPendingRequests()))
				),
			{
				dispatch: false
			}
		)


		// get all friends of individual
		this.individualFriends$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getIndividualFriends),
				mergeMap(() =>
					this.friendsService.getIndividualFriends().pipe(
						map(response => {
							console.log('fetching friends done successfully!')
							return getIndividualFriendsSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getIndividualFriendsFailure({error}))
						})
					)
				)
			)
		)
	}
}
