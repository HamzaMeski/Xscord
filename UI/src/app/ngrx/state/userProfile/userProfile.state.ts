import {UserProfileResponse} from "../../../core/types/userProfile/userProfiles.types";


export interface UserProfileState {
	user: UserProfileResponse | null,
	loading: boolean,
	error: string | null
}

export const initialUserProfileState: UserProfileState = {
	user: null,
	loading: false,
	error: null
}
