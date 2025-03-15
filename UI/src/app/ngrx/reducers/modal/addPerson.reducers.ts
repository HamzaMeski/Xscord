import {createReducer, on} from "@ngrx/store";
import {initialAddPersonModalState} from "../../state/modal/addPerson.state";
import {closeAddPersonModal, openAddPersonModal} from "../../actions/modal/addPerson.actions";


export const openAddPersonReducers = createReducer(
	initialAddPersonModalState,

	on(openAddPersonModal, (state)=> ({
		...state,
		open:true
	})),

	on(closeAddPersonModal, (state) => ({
		...state,
		open:false
	}))
)