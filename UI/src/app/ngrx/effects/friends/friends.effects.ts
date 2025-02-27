import {Injectable} from "@angular/core";
import {
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess, getPendingRequests, getPendingRequestsFailure, getPendingRequestsSuccess
} from "../../actions/friends/friends.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FriendsService} from "../../../core/services/fetch/friends.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class FriendsEffects {
	friendShipDemand$
	// friendShipDemandSuccess$
	pendingRequests$
	// pendingRequestsSuccess$

	constructor(
		private actions$: Actions,
		private friendsService: FriendsService,
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

	/*	this.friendShipDemandSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(friendShipDemandSuccess),
				tap(({response}) => {
					console.log('friendShipDemand done successfully (effect):')
					console.log(response.requester)
				})
			),
			{dispatch: false}
		)*/



		// get all pending requests
		this.pendingRequests$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getPendingRequests),
				mergeMap(() =>
					this.friendsService.getPendingRequests().pipe(
						map(response => {
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



	}
}
