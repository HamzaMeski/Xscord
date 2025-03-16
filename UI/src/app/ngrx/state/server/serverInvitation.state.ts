import {ServerJoinDemandResponse} from "../../../core/types/server/serverJoinDemand.types";
import {IndividualResponse} from "../../../core/types/individual/individual.types";
import {ServerResponse} from "../../../core/types/server/server.types";


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
	},

	serverMembers: {
		members: IndividualResponse[] | null,
		loading: boolean,
		error: string | null
	},

	memberJoinedServers: {
		servers: ServerResponse[] | null,
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
	},

	serverMembers: {
		members: null,
		loading: false,
		error: null
	},

	memberJoinedServers: {
		servers: null,
		loading: false,
		error: null
	}
}
