import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../core/services/restfull/backend/auth.service";
import {Router} from "@angular/router";
import {register, registerFailure, registerSuccess} from "../../actions/auth/register.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class RegisterEffects {
	register$
	registerSuccess$

	constructor(
		private actions$ : Actions,
		private authService: AuthService,
		private router: Router
	) {
		this.register$ = createEffect(() =>
			this.actions$.pipe(
				ofType(register),
				mergeMap(({request}) => {
					return this.authService.register(request).pipe(
						map(response => registerSuccess({response})),
						catchError(err => {
							const error: string = err?.error?.message || 'registration failed'
							return of(registerFailure({error}))
						})
					)
				})
			)
		)


		this.registerSuccess$ = createEffect(() =>
				this.actions$.pipe(
					ofType(registerSuccess),
					tap(() => this.router.navigate(['/auth/login']))
				),
			{dispatch: false}
		)
	}
}