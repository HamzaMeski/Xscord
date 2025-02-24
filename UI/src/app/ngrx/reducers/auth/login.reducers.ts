import {createReducer, on} from "@ngrx/store";
import {initialLoginState} from "../../state/auth/login.state";
import {login, loginFailure, loginSuccess} from "../../actions/auth/login.actions";


export const loginReducers= createReducer(
	initialLoginState,

	on(login, (state) => ({
		...state,
		authUser: null,
		loading: true,
		error: null
	})),

	on(loginSuccess, (state, action) => ({
		...state,
		authUser: action.response,
		loading: false,
		error: null
	})),

	on(loginFailure, (state, action) => ({
		...state,
		authUser: null,
		loading: false,
		error: action.error
	}))
)