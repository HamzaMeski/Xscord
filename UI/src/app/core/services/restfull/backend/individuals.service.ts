import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IndividualResponse} from "../../../types/individual/individual.types";
import {serverApiUrl} from "../../../../../environments/env";


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
}
