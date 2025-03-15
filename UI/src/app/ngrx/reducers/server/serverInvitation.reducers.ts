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
		invitationRequest: action.request,
		invitationResponse: null,
		loading: true,
		error: null
	})),

	on(sendServerInvitationSuccess, (state, action)=> ({
		...state,
		invitationRequest: null,
		invitationResponse: action.response,
		loading: true,
		error: null
	})),

	on(sendServerInvitationError, (state)=> ({
		...state,
		invitationRequest: null,
		invitationResponse: null,
		loading: true,
		error: null
	})),
)