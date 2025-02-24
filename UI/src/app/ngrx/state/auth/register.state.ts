import {RegisterResponse} from "../../../core/types/auth/register.types";

export interface RegisterState {
	user: RegisterResponse | null,
	loading: boolean,
	error: string | null
}

export const initialRegisterState: RegisterState = {
	user: null,
	loading: false,
	error: null
}