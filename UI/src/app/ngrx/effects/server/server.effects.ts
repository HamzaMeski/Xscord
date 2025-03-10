import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ServerService} from "../../../core/services/restfull/backend/server.service";


@Injectable()
export class ServerEffects {

	constructor(
		private actions$: Actions,
		private store: Store,
		private serverService: ServerService
	) {

	}
}