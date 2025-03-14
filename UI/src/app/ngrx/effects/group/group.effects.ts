import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {getServerGroups, getServerGroupsFailure, getServerGroupsSuccess} from "../../actions/group/group.actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {GroupService} from "../../../core/services/restfull/backend/group.service";


@Injectable()
export class GroupEffects {
	serverGroups$

	constructor(
		private actions$: Actions,
		private groupService: GroupService,
	) {
		this.serverGroups$ = createEffect(()=>
			this.actions$.pipe(
				ofType(getServerGroups),
				mergeMap(({serverId}) => {
					console.log('despatching (serverId): ', serverId)
					return this.groupService.getServerGroups(serverId).pipe(
						map(response => {
							console.log('Effect: ', response)
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