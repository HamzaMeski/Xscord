import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {login, loginFailure, loginSuccess} from "../../actions/auth/login.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";


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
							console.log('login effect here...')
							console.log(response)
							return loginSuccess({response})
						}),
						catchError(err => {
							const error: string = err?.error?.message || 'login failed'
							return of(loginFailure({error}))
						})
					)
				)
			)
		)

		this.loginSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loginSuccess),
				tap(()=> console.log('logged in successfully'))
			),
			{dispatch: false}
		)
	}
}