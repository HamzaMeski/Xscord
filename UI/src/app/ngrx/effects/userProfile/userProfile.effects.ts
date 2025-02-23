import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {
	loadUserProfile,
	loadUserProfileFailure,
	loadUserProfileSuccess
} from "../../actions/userProfile/userProfile.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class UserProfileEffects {
	loadUserProfile$
	loadUserProfileSuccess$

	constructor(
		private actions$ : Actions,
		private authService : AuthService,
		private router : Router
	) {
		this.loadUserProfile$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadUserProfile),
				mergeMap(() =>
					this.authService.getAuthenticatedUser().pipe(
						map(response => loadUserProfileSuccess({response})),
						catchError(err => {
							const error: string = err.error.message || 'load user profile failed'
							return of(loadUserProfileFailure({error}))
						})
					)
				)
			)
		)

		this.loadUserProfileSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadUserProfileSuccess),
				tap(({response}) => {
					console.log('profile loaded successfully')
					console.log(response)
				})
			)
		)
	}
}
