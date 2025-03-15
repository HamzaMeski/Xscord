import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AddPersonModalState} from "../../state/modal/addPerson.state";


export const selectOpenAddPersonModalState = createFeatureSelector<AddPersonModalState>('openAddPersonModal')
export const selectOpenAddPersonModal = createSelector(
	selectOpenAddPersonModalState,
	(state: AddPersonModalState)=> state.open
)