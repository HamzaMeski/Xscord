import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {getServerGroups, getServerGroupsFailure, getServerGroupsSuccess} from "../../actions/group/group.actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {GroupService} from "../../../core/services/restfull/backend/group.service";


@Injectable()
export class GroupEffects {
	serverGroups$

	constructor(
		private actions$: Actions,
		private groupService: GroupService,
		private store: Store
	) {
		this.serverGroups$ = createEffect(()=>
			this.actions$.pipe(
				ofType(getServerGroups),
				mergeMap(({serverId}) => {
					return this.groupService.getServerGroups(serverId).pipe(
						map(response => {
							return getServerGroupsSuccess({response})
						}),
						catchError(err => {
							const error: string = err.error.message
							return of(getServerGroupsFailure({error}))
						})
					)
				})
			)
		)
	}
}