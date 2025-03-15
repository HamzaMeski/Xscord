import {Injectable} from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	GuardResult,
	MaybeAsync,
	RouterStateSnapshot
} from "@angular/router";
import {AuthFacadeService} from "../../services/helpers/authFacade.service";


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private authFacadeService: AuthFacadeService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
		return this.authFacadeService.hasToken();
	}
}
