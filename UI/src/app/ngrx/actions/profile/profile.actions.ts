import {createAction, props} from "@ngrx/store";
import {RegisterRequest, RegisterResponse} from "../../../core/types/auth/register.types";


export const update = createAction(
	'[Profile] Update Request',
	props<{ request: RegisterRequest, userId: number}>()
)

export const updateSuccess = createAction(
	'[Profile] Update Success',
	props<{ response: RegisterResponse }>()
)

export const updateFailure = createAction(
	'[Profile] Update Failure',
	props<{ error: string }>()
)