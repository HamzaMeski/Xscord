import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GroupsState} from "../../state/group/group.state";

// get server groups
export const selectServerGroupsState = createFeatureSelector<GroupsState['getServerGroups']>('getServerGroups')

export const selectServerGroupsResponse = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.groups
)

export const selectServerGroupsLoading = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.loading
)

export const selectServerGroupsFailure = createSelector(
	selectServerGroupsState,
	(state:GroupsState['getServerGroups'])=> state.error
)
