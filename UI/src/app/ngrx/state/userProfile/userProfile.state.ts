import {IndividualResponse} from "../../../core/types/individual/individual.types";


export interface UserProfileState {
	user: IndividualResponse | null,
	loading: boolean,
	error: string | null
}

export const initialUserProfileState: UserProfileState = {
	user: null,
	loading: false,
	error: null
}
