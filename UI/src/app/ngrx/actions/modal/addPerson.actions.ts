import {createAction, props} from "@ngrx/store";


export const openAddPersonModal = createAction(
	'[AddPersonModal] Open Modal'
)

export const closeAddPersonModal = createAction(
	'[AddPersonModal] Close Modal'
)
