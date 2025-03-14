import {createAction, props} from "@ngrx/store";
import {GroupResponse} from "../../../core/types/server/group.types";

// get server groups
export const getServerGroups = createAction(
	'[Group] Get Server Groups',
	props<{ serverId: number }>()
)

export const getServerGroupsSuccess = createAction(
	'[Group] Get Server Groups Success',
	props<{response: GroupResponse[]}>()
)

export const getServerGroupsFailure = createAction(
	'[Group] Get Server Groups Failure',
	props<{error: string}>()
)
