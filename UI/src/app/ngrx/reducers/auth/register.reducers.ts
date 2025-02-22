import {createReducer, on} from "@ngrx/store";
import {initialRegisterState} from "../../state/auth/register.state";
import {register, registerFailure, registerSuccess} from "../../actions/auth/register.actions";


export const registerReducers = createReducer(
	initialRegisterState,

	on(register, (state) => ({
		...state,
		user: null,
		loading: true,
		error: null
	})),

	on(registerSuccess, (state, {response}) => ({
		...state,
		user: response,
		loading: false,
		error: null
	})),

	on(registerFailure, (state, {error}) => ({
		...state,
		user: null,
		loading: false,
		error: error
	}))
)