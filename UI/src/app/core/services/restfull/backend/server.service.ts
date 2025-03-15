import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServerRequest, ServerResponse} from "../../../types/server/server.types";
import {ServerJoinDemandRequest, ServerJoinDemandResponse} from "../../../types/server/serverJoinDemand.types";

@Injectable({
	providedIn: 'root'
})
export class ServerService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {}

	// Connection to backend ServerController
	createServer(serverRequest: ServerRequest): Observable<ServerResponse> {
		return this.http.post<ServerResponse>(`${this.API_URL}/servers/create`, serverRequest)
	}

	getIndividualServers(): Observable<ServerResponse[]> {
		return this.http.get<ServerResponse[]>(`${this.API_URL}/servers/individualServers`, {})
	}

	getServer(serverId: number): Observable<ServerResponse> {
		return this.http.get<ServerResponse>(`${this.API_URL}/servers/${serverId}`, {})
	}

	deleteServer(serverId: number): Observable<any> {
		return this.http.delete(`${this.API_URL}/servers/{${serverId}`, {})
	}


	// Connection to backend FriendShipDemandController
	sendServerJoinInvitation(request: ServerJoinDemandRequest): Observable<ServerJoinDemandResponse> {
		return this.http.post<ServerJoinDemandResponse>(`${this.API_URL}/serverJoinRequest/send`,request)
	}

	acceptRequest(requestId: number): Observable<ServerJoinDemandResponse> {
		return this.http.put<ServerJoinDemandResponse>(`${this.API_URL}/serverJoinRequest/accept/${requestId}`, {})
	}

	refuseRequest(requestId: number): Observable<any> {
		return this.http.delete(`${this.API_URL}/serverJoinRequest/refuse/${requestId}`, {})
	}
}