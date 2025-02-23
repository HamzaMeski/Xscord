import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem("authUserToken");
		if(token) {
			req = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
			})
		}else {
			alert('there is no token')
		}
		console.log(req)
		return next.handle(req).pipe(
			catchError(err => {
				if(err.status == 401) {
					localStorage.removeItem("authUserToken")
				}else if(err.status == 403) {
					alert('forbidden')
				}
				return throwError(()=> err)
			})
		)
	}
}