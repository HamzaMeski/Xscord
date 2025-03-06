import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthFacadeService} from "../services/authFacade.service";
import {RedirectionService} from "../services/redirection.service";

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
	private publicEndPoints: string[] = [
		'http://localhost:8080/api/v1/auth/login',
		'http://localhost:8080/api/v1/individuals/register'
	]

	constructor(
		private authFacadeService: AuthFacadeService,
		private redirectionService: RedirectionService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		/*
			public endpoints
		*/
		if(this.publicEndPoints.some(url => url == req.url.valueOf())) {
			return next.handle(req)
		}

		/*
			AI endpoint
		*/
		if(req.url.valueOf() == 'https://openrouter.ai/api/v1/chat/completions') {
			req = req.clone({
				headers: req.headers
					.set('Authorization', `Bearer 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`)
					.set('Content-Type', 'application/json')
			})

			return next.handle(req)
		}

		/*
			private endpoints
		*/
		if(this.authFacadeService.hasToken()) {
			const token = localStorage.getItem("authUserToken");
			req = req.clone({
				headers: req.headers
					.set('Authorization', `Bearer ${token}`)
					.set('Content-Type', 'application/json')
			})

			return next.handle(req).pipe(
				catchError(err => {
					if(err.status == 401) {
						this.redirectionService.toLogin()
					}else if(err.status == 403) {
						this.redirectionService.toForbidden()
					}
					return throwError(()=> err)
				})
			)
		}else {
			return next.handle(req)
		}
	}
}
