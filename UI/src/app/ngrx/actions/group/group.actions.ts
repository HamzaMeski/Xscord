import {createAction, props} from "@ngrx/store";
import {GroupResponse} from "../../../core/types/group/group.types";

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


// get group
export const getGroup = createAction(
	'[Group] Get Group',
	props<{ groupId: number }>()
)
export const getGroupSuccess = createAction(
	'[Group] Get Group Success',
	props<{response: GroupResponse}>()
)
export const getGroupError = createAction(
	'[Group] Get Group Error',
	props<{error: string}>()
)

