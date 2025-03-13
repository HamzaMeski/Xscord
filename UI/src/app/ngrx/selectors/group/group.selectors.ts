import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GroupsState} from "../../state/group/group.state";

// get server groups
export const selectServerGroupsState = createFeatureSelector<GroupsState['getServerGroups']>('getServerGroups')

export const selectServerGroupResponse = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.groups
)

export const selectServerGroupLoading = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.loading
)

export const selectServerGroupFailure = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.error
)