import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "../types/auth/login.types";
import {Observable} from "rxjs";
import {RegisterRequest, RegisterResponse} from "../types/auth/register.types";
import {UserProfileResponse} from "../types/userProfile/userProfiles.types";


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly API_URL: string = 'http://localhost:8080/api/v1'

	constructor(private http: HttpClient) {}

	login(request: LoginRequest): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, request)
	}

	register(request: RegisterRequest): Observable<RegisterResponse> {
		return this.http.post<RegisterResponse>(`${this.API_URL}/individuals/register`, request)
	}

	getAuthenticatedUser(): Observable<UserProfileResponse> {
		return this.http.get<UserProfileResponse>(`${this.API_URL}/auth/authenticatedUser`)
	}
}
