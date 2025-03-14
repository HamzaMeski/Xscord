import {ServerResponse} from "../../../core/types/server/server.types";


export interface ServersState {
	newServer: {
		server: ServerResponse | null,
		loading: boolean,
		error: string | null
	},

	individualServers: {
		servers: ServerResponse[] | null,
		loading: boolean,
		error: string | null
	},

	server: {
		server: ServerResponse | null,
		loading: boolean,
		error: string | null
	},

	deletion: {
		loading: boolean,
		error: string | null
	}
}

export const initialServersState: ServersState = {
	newServer: {
		server: null,
		loading: false,
		error:null
	},

	individualServers: {
		servers: null,
		loading: false,
		error:null
	},

	server: {
		server: null,
		loading: false,
		error: null
	},

	deletion: {
		loading: false,
		error:null
	}
}
