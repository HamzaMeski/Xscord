import {createReducer, on} from "@ngrx/store";
import {initialUpdateState} from "../../state/profile/profile.state";
import {update, updateFailure, updateSuccess} from "../../actions/profile/profile.actions";


export const updateReducers = createReducer(
	initialUpdateState,

	on(update, (state) => {
		return ({
			...state,
			user: null,
			loading: true,
			error: null
		})
	}),

	on(updateSuccess, (state, action) => ({
		...state,
		user: action.response,
		loading: false,
		error: null
	})),

	on(updateFailure, (state, action) => ({
		...state,
		user: null,
		loading: false,
		error: action.error
	}))
)