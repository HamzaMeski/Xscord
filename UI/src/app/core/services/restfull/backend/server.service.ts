import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServerRequest, ServerResponse} from "../../../types/server/server.types";

@Injectable({
	providedIn: 'root'
})
export class ServerService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {
	}

	createServer(serverRequest: ServerRequest): Observable<ServerResponse> {
		return this.http.post<ServerResponse>(`${this.API_URL}/servers/create`, serverRequest)
	}

	getIndividualServers(): Observable<ServerResponse[]> {
		return this.http.get<ServerResponse[]>(`${this.API_URL}/servers/individualServers`, {})
	}

	deleteServer(serverId: number): Observable<any> {
		return this.http.delete(`${this.API_URL}/servers/{${serverId}`, {})
	}
}