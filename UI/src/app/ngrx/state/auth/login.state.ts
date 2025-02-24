import {LoginResponse} from "../../../core/types/auth/login.types";


export interface LoginState {
	authUser: LoginResponse | null,
	loading: boolean,
	error: string | null
}

export const initialLoginState: LoginState= {
	authUser: null,
	loading: false,
	error: null
}