import {Injectable} from "@angular/core";
import {
	friendShipDemand,
	friendShipDemandFailure,
	friendShipDemandSuccess
} from "../../actions/friends/friends.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {FriendsService} from "../../../core/services/fetch/friends.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class FriendsEffects {
	friendShipDemand$
	friendShipDemandSuccess$

	constructor(
		private actions$: Actions,
		private friendsService: FriendsService,
		private router: Router
	) {
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

		this.friendShipDemandSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(friendShipDemandSuccess),
				tap(({response}) => {
					console.log('friendShipDemand done successfully (effect):')
					console.log(response.requester)
				})
			),
			{dispatch: false}
		)
	}
}