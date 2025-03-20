import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UpdateState} from "../../state/profile/profile.state";

export const selectUpdateState = createFeatureSelector<UpdateState>('updateProfile')

export const selectUpdateUser = createSelector(
	selectUpdateState,
	(state: UpdateState)=> state.user
)

export const selectUpdateUserLoading = createSelector(
	selectUpdateState,
	(state: UpdateState)=> state.loading
)

export const selectUpdateUserError = createSelector(
	selectUpdateState,
	(state: UpdateState)=> state.error
)
