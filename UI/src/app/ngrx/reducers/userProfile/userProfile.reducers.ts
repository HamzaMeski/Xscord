import {createReducer, on} from "@ngrx/store";
import {initialUserProfileState} from "../../state/userProfile/userProfile.state";
import {
	deleteUserProfile,
	loadUserProfile,
	loadUserProfileFailure,
	loadUserProfileSuccess
} from "../../actions/userProfile/userProfile.actions";


export const userProfileReducers = createReducer(
	initialUserProfileState,

	on(loadUserProfile, (state) => ({
		...state,
		user: null,
		loading: true,
		error: null
	})),

	on(loadUserProfileSuccess, (state, action) => ({
		...state,
		user: action.response,
		loading: false,
		error: null
	})),

	on(loadUserProfileFailure, (state, action) => ({
		...state,
		user: null,
		loading: false,
		error: action.error
	})),
)