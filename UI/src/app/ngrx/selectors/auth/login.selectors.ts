import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LoginState} from "../../state/auth/login.state";


export const selectLoginState = createFeatureSelector<LoginState>('login')

export const selectLoginAuthUser = createSelector(
	selectLoginState,
	(state: LoginState) => state.authUser
)

export const selectLoginLoading = createSelector(
	selectLoginState,
	(state: LoginState) => state.loading
)

export const selectLoginError = createSelector(
	selectLoginState,
	(state: LoginState) => state.error
)