import {ServerJoinDemandResponse} from "../../../core/types/server/serverJoinDemand.types";


export interface ServerInvitationState {
	send: {
		invitationResponse: ServerJoinDemandResponse | null,
		loading: boolean,
		error: string | null
	},

	accept: {
		invitationResponse: ServerJoinDemandResponse| null,
		loading: boolean,
		error: string | null
	},

	refuse: {
		loading: boolean,
		error: string | null
	},

	receiverInvitations: {
		invitationsResponse: ServerJoinDemandResponse[] | null,
		loading: boolean,
		error: string | null
	}
}

export const initialServerInvitationState: ServerInvitationState = {
	send: {
		invitationResponse: null,
		loading: false,
		error: null
	},

	accept: {
		invitationResponse: null,
		loading: false,
		error: null
	},

	refuse: {
		loading: false,
		error: null
	},

	receiverInvitations: {
		invitationsResponse: null,
		loading: false,
		error: null
	}
}
