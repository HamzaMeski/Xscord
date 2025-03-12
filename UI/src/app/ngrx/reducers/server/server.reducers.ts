import {createReducer, on} from "@ngrx/store";
import {initialServersState} from "../../state/server/server.state";
import {
	createServer,
	createServerFailure,
	createServerSuccess,
	getIndividualServers, getIndividualServersFailure, getIndividualServersSuccess
} from "../../actions/server/server.actions";


export const createServerReducers = createReducer(
	initialServersState.newServer,

	on(createServer, (state) => ({
		...state,
		server: null,
		loading: true,
		error: null
	})),

	on(createServerSuccess, (state, action) => ({
		...state,
		server: action.response,
		loading: false,
		error: null
	})),

	on(createServerFailure, (state, action) => ({
		...state,
		server: null,
		loading: false,
		error: action.error
	})),
)


export const getIndividualServersReducers  = createReducer(
	initialServersState.individualServers,

	on(getIndividualServers, (state) => ({
		...state,
		servers: null,
		loading: true,
		error: null
	})),

	on(getIndividualServersSuccess, (state, action) => ({
		...state,
		servers: action.response,
		loading: false,
		error: null
	})),

	on(getIndividualServersFailure, (state, action) => ({
		...state,
		servers: null,
		loading: false,
		error: action.error
	})),
)
