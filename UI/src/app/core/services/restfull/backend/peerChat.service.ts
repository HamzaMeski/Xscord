import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {peerMessageResponse} from "../../../types/peerChat/peerChat.types";
import {serverApiUrl} from "../../../../../environments/env";

@Injectable({
	providedIn: 'root'
})
export class PeerChatService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {
	}

	getChatHistory(individual2Id: number): Observable<peerMessageResponse[]> {
		return this.http.get<peerMessageResponse[]>(`${this.API_URL}/peerMessages/getChatHistory/${individual2Id}`, {})
	}
}