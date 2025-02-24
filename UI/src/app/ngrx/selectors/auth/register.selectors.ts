import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RegisterState} from "../../state/auth/register.state";


export const selectRegisterState = createFeatureSelector<RegisterState>('register')

export const selectRegisterUser = createSelector(
	selectRegisterState,
	(state: RegisterState)=> state.user
)

export const selectRegisterLoading = createSelector(
	selectRegisterState,
	(state: RegisterState)=> state.loading
)

export const selectRegisterError = createSelector(
	selectRegisterState,
	(state: RegisterState)=> state.error
)
