import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IndividualResponse} from "../../../types/individual/individual.types";
import {serverApiUrl} from "../../../../../environments/env";
import {RegisterRequest, RegisterResponse} from "../../../types/auth/register.types";


@Injectable({
	providedIn: 'root'
})
export class IndividualsService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {
	}

	getIndividual(friendId: number): Observable<IndividualResponse> {
		return this.http.get<IndividualResponse>(`${this.API_URL}/individuals/${friendId}`, {})
	}

	update(request: RegisterRequest, userId: number): Observable<RegisterResponse> {
		return this.http.put<RegisterResponse>(`${this.API_URL}/individuals/${userId}`, request)
	}
}
