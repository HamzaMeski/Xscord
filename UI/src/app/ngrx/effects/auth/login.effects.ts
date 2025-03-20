import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/restfull/backend/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {login, loginFailure, loginSuccess} from "../../actions/auth/login.actions";
import {catchError, concatMap, map, mergeMap, of, tap} from "rxjs";
import {connectToChat} from "../../actions/peerChat/peerChat.actions";


@Injectable()
export class LoginEffects {
	login$
	loginSuccess$

	constructor(
		private actions$ : Actions,
		private authService : AuthService,
		private router : Router
	) {
		this.login$ = createEffect(() =>
			this.actions$.pipe(
				ofType(login),
				mergeMap(({request}) =>
					this.authService.login(request).pipe(
						map(response => {
							return loginSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message || 'login failed'
							return of(loginFailure({error}))
						})
					)
				)
			)
		)

		this.loginSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loginSuccess),
				concatMap(({response})=> {
					const authUserToken = response.token
					localStorage.setItem('authUserToken', authUserToken)
					this.router.navigate(['/individual/friend/mng/allFriends'])

					console.log(localStorage.getItem('authUserToken'))
					console.log('before connecting in login effect:')
					return of(connectToChat())
				})
			)
		)
	}
}