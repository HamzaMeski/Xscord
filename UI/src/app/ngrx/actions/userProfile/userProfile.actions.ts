import {createAction, props} from "@ngrx/store";
import {IndividualResponse} from "../../../core/types/individual/individual.types";


export const loadUserProfile = createAction(
	'[UserProfile] Load UserProfile'
)

export const loadUserProfileSuccess = createAction(
	'[UserProfile] Load UserProfileSuccess',
	props<{ response: IndividualResponse}>()
)

export const loadUserProfileFailure = createAction(
	'[UserProfile] Load UserProfileFailure',
	props<{ error: string}>()
)

export const deleteUserProfile = createAction(
	'[UserProfile] deleteUserProfile'
)
