import {createAction, props} from "@ngrx/store";
import {UserProfileResponse} from "../../../core/types/userProfile/userProfiles.types";


export const loadUserProfile = createAction(
	'[UserProfile] Load UserProfile'
)

export const loadUserProfileSuccess = createAction(
	'[UserProfile] Load UserProfileSuccess',
	props<{ response: UserProfileResponse}>()
)

export const loadUserProfileFailure = createAction(
	'[UserProfile] Load UserProfileFailure',
	props<{ error: string}>()
)

export const deleteUserProfile = createAction(
	'[UserProfile] deleteUserProfile'
)
