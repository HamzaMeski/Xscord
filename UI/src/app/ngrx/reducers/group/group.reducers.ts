import {createReducer, on} from "@ngrx/store";
import {initialGroupsState} from "../../state/group/group.state";
import {getServerGroups, getServerGroupsFailure, getServerGroupsSuccess} from "../../actions/group/group.actions";


// get server groups
export const getServerGroupsReducers = createReducer(
	initialGroupsState.getServerGroups,

	on(getServerGroups, (state) => ({
		...state,
		groups: null,
		loading: true,
		error: null
	})),

	on(getServerGroupsSuccess, (state, action) => ({
		...state,
		groups: action.response,
		loading: false,
		error: null
	})),

	on(getServerGroupsFailure, (state, action) => ({
		...state,
		groups: null,
		loading: false,
		error: action.error
	}))
)