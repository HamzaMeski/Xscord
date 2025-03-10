import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {peerMessageResponse} from "../../../types/peerChat/peerChat.types";

@Injectable({
	providedIn: 'root'
})
export class PeerChatRestService {
	private readonly API_URL: string = 'http://localhost:8080/api/v1'

	constructor(private http: HttpClient) {
	}

	getChatHistory(individual2Id: number): Observable<peerMessageResponse[]> {
		return this.http.get<peerMessageResponse[]>(`${this.API_URL}/peerMessages/getChatHistory/${individual2Id}`, {})
	}
}