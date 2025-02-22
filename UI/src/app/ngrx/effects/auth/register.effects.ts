import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {register, registerFailure, registerSuccess} from "../../actions/auth/register.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class RegisterEffects {

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(register),
			mergeMap(({request}) => {
				console.log('effect staring here...')
				console.log(request)
				return this.authService.register(request).pipe(
					map(response => registerSuccess({response})),
					catchError(error =>
						of(registerFailure({error}))
					)
				)
			})
		)
	)

	registerSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerSuccess),
			tap(() => this.router.navigate(['/auth/login']))
		)
	)

	constructor(
		private actions$ : Actions,
		private authService: AuthService,
		private router: Router
	) {}

}