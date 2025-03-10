import {Injectable} from "@angular/core";
import {RedirectionService} from "./redirection.service";


@Injectable({
	providedIn: 'root'
})
export class AuthFacadeService {

	constructor(
		private redirectionService: RedirectionService
	) {}

	hasToken(): boolean {
		const token = localStorage.getItem('authUserToken')
		if(!token) {
			localStorage.removeItem("authUserToken")
			this.redirectionService.toLogin()
			return false
		}

		return true
	}
}