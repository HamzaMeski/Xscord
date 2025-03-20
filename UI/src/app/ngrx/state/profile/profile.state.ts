import {RegisterResponse} from "../../../core/types/auth/register.types";


export interface UpdateState {
	user: RegisterResponse | null,
	loading: boolean,
	error: string | null
}

export const initialUpdateState: UpdateState = {
	user: null,
	loading: false,
	error: null
}
