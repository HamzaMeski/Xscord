import {createReducer, on} from "@ngrx/store";
import {initialRegisterState} from "../../state/auth/register.state";
import {register, registerFailure, registerSuccess} from "../../actions/auth/register.actions";


export const registerReducers = createReducer(
	initialRegisterState,

	on(register, (state) => {
		return ({
			...state,
			user: null,
			loading: true,
			error: null
		})
	}),

	on(registerSuccess, (state, action) => ({
		...state,
		user: action.response,
		loading: false,
		error: null
	})),

	on(registerFailure, (state, action) => ({
		...state,
		user: null,
		loading: false,
		error: action.error
	}))
)