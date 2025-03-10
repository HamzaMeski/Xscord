import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ServersState} from "../../state/server/server.state";


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

