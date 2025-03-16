import {createReducer, on} from "@ngrx/store";
import {initialServerInvitationState} from "../../state/server/serverInvitation.state";
import {
	acceptServerInvitation,
	acceptServerInvitationError,
	acceptServerInvitationSuccess,
	getReceiverInvitations,
	getReceiverInvitationsError,
	getReceiverInvitationsSuccess,
	getServerMembers, getServerMembersError,
	getServerMembersSuccess,
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

	on(sendServerInvitationError, (state, action)=> ({
		...state,
		invitationResponse: null,
		loading: false,
		error: action.error
	})),
)


export const getReceiverInvitationsReducer = createReducer(
	initialServerInvitationState.receiverInvitations,

	on(getReceiverInvitations, (state) => ({
		...state,
		invitationsResponse: null,
		loading: true,
		error: null
	})),

	on(getReceiverInvitationsSuccess, (state, action) => ({
		...state,
		invitationsResponse: action.response,
		loading: false,
		error: null
	})),

	on(getReceiverInvitationsError, (state, action) => ({
		...state,
		invitationsResponse: null,
		loading: false,
		error: action.error
	})),
)


export const acceptServerInvitationReducer = createReducer(
	initialServerInvitationState.accept,

	on(acceptServerInvitation, (state, action)=> ({
		...state,
		invitationResponse: null,
		loading: true,
		error: null
	})),

	on(acceptServerInvitationSuccess, (state, action)=> ({
		...state,
		invitationResponse: action.response,
		loading: false,
		error: null
	})),

	on(acceptServerInvitationError, (state, action)=> ({
		...state,
		invitationResponse: null,
		loading: false,
		error: action.error
	})),
)


export const getServerMembersReducer = createReducer(
	initialServerInvitationState.serverMembers,

	on(getServerMembers, (state) => ({
		...state,
		members: null,
		loading: true,
		error: null
	})),

	on(getServerMembersSuccess, (state, action) => ({
		...state,
		members: action.response,
		loading: false,
		error: null
	})),

	on(getServerMembersError, (state, action) => ({
		...state,
		members: null,
		loading: false,
		error: action.error
	})),
)
