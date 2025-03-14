import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ServersState} from "../../state/server/server.state";


// create a server selector
export const selectCreateServerState = createFeatureSelector<ServersState['newServer']>('createServer')

export const selectCreateServerResponse = createSelector(
	selectCreateServerState,
	(state: ServersState['newServer'])=> state.server
)
export const selectCreateServerLoading = createSelector(
	selectCreateServerState,
	(state: ServersState['newServer'])=> state.loading
)
export const selectCreateServerError = createSelector(
	selectCreateServerState,
	(state: ServersState['newServer'])=> state.error
)


// get individual servers selector
export const selectGetIndividualServersState = createFeatureSelector<ServersState['individualServers']>('getIndividualServers')

export const selectGetIndividualServersResponse = createSelector(
	selectGetIndividualServersState,
	(state: ServersState['individualServers'])=> state.servers
)

export const selectGetIndividualServersLoading = createSelector(
	selectGetIndividualServersState,
	(state: ServersState['individualServers'])=> state.loading
)

export const selectGetIndividualServersFailure = createSelector(
	selectGetIndividualServersState,
	(state: ServersState['individualServers'])=> state.error
)


// get server
export const selectServerState = createFeatureSelector<ServersState['server']>('getServer')

export const selectServerResponse = createSelector(
	selectServerState,
	(state: ServersState['server'])=> state.server
)

export const selectServerLoading = createSelector(
	selectServerState,
	(state: ServersState['server'])=> state.loading
)

export const selectServerFailure = createSelector(
	selectServerState,
	(state: ServersState['server'])=> state.error
)
