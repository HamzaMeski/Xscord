import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
	providedIn: 'root'
})
export class AuthFacadeService {

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	hasValidToken(): Observable<boolean> {
		const token = localStorage.getItem('authUserToken')
		if(!token) {
			this.router.navigate(['/auth/login'])
			return of(false)
		}

		// check if that token is valid
	    return this.authService.getAuthenticatedUser().pipe(
			map(() => true),
			catchError(() => of(false))
		)
	}
}