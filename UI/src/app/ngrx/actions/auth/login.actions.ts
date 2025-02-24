import {createAction, props} from "@ngrx/store";
import {LoginRequest, LoginResponse} from "../../../core/types/auth/login.types";


export const login = createAction(
	'[Auth] Login Request',
	props<{ request: LoginRequest}>()
)

export const loginSuccess= createAction(
	'[Auth] Login Success',
	props<{ response: LoginResponse}>()
)

export const loginFailure = createAction(
	'[Auth] Login Failure',
	props<{error: string}>()
)
