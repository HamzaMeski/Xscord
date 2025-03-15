import {createReducer, on} from "@ngrx/store";
import {initialServerInvitationState} from "../../state/server/serverInvitation.state";
import {
	sendServerInvitation,
	sendServerInvitationError,
	sendServerInvitationSuccess
} from "../../actions/server/serverInvitation.actions";


export const sendServerInvitationReducer = createReducer(
	initialServerInvitationState.send,

	on(sendServerInvitation, (state, action)=> ({
		...state,
		invitationResponse: null,
		loading: true,
		error: null
	})),

	on(sendServerInvitationSuccess, (state, action)=> ({
		...state,
		invitationResponse: action.response,
		loading: false,
		error: null
	})),

	on(sendServerInvitationError, (state)=> ({
		...state,
		invitationResponse: null,
		loading: false,
		error: null
	})),
)