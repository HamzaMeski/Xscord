import {createReducer, on} from "@ngrx/store";
import {initialGroupsState} from "../../state/group/group.state";
import {getServerGroups, getServerGroupsFailure, getServerGroupsSuccess} from "../../actions/group/group.actions";


// get server groups
export const getServerGroupsReducers = createReducer(
	initialGroupsState.getServerGroups,

	on(getServerGroups, (state) => ({
		...state,
		group: null,
		loading: true,
		error: null
	})),

	on(getServerGroupsSuccess, (state, action) => ({
		...state,
		group: action.response,
		loading: false,
		error: null
	})),

	on(getServerGroupsFailure, (state, action) => ({
		...state,
		group: null,
		loading: false,
		error: action.error
	}))
)