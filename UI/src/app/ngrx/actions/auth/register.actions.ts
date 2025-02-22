import {createAction, props} from "@ngrx/store";
import {RegisterRequest, RegisterResponse} from "../../../core/types/auth/register.types";

export const register = createAction(
	'[Auth] Register Request',
	props<{ request: RegisterRequest }>()
)

export const registerSuccess = createAction(
	'[Auth] Register Success',
	props<{ response: RegisterResponse }>()
)

export const registerFailure = createAction(
	'[Auth] Register Failure',
	props<{ error: string }>()
)