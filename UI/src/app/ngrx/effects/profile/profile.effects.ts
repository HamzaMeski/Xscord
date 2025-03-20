import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerFailure} from "../../actions/auth/register.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {update, updateSuccess} from "../../actions/profile/profile.actions";
import {IndividualsService} from "../../../core/services/restfull/backend/individuals.service";


@Injectable()
export class UpdateProfileEffects {
	update$

	constructor(
		private actions$ : Actions,
		private individualsService: IndividualsService,
	) {
		this.update$ = createEffect(() =>
			this.actions$.pipe(
				ofType(update),
				mergeMap(({request, userId}) => {
					console.log('REQUEST: ', request, userId)
					return this.individualsService.update(request, userId).pipe(
						map(response => {
							console.log('RESPONSE: ', response)
							return updateSuccess({response})
						}),
						catchError(err => {
							const error: string = err?.error?.message || 'user update failed'
							return of(registerFailure({error}))
						})
					)
				})
			)
		)

/*
		this.registerSuccess$ = createEffect(() =>
				this.actions$.pipe(
					ofType(registerSuccess),
					tap(() => )
				),
			{dispatch: false}
		)*/
	}
}
