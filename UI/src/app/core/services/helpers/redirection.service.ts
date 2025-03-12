import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class RedirectionService {
	constructor(
		private router: Router
	) {}

	toLogin(){
		this.router.navigate(['/auth/login'])
	}

	toForbidden() {
		this.router.navigate(['/forbidden'])
	}
}