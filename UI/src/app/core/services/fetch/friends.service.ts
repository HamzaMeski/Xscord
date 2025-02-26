import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendShipDemandResponse} from "../../types/friends /friends.types";

@Injectable({
	providedIn: 'root'
})
export class FriendsService {
	private readonly API_URL: string = 'http://localhost:8080/api/v1'

	constructor(private http: HttpClient) {
	}

	sendFriendShipRequest(receiverId: number): Observable<FriendShipDemandResponse> {
		return this.http.post<FriendShipDemandResponse>(`${this.API_URL}/friendShipDemand/sendRequest/${receiverId}`, {})
	}

	acceptRequest(requestId: number): Observable<FriendShipDemandResponse> {
		return this.http.put<FriendShipDemandResponse>(`${this.API_URL}/friendShipDemand/acceptRequest/${requestId}`, {})
	}

	ignoreRequest(requestId: number): Observable<any> {
		return this.http.delete(`${this.API_URL}/friendShipDemand/ignoreRequest/${requestId}`, {})
	}

	getPendingRequests(): Observable<FriendShipDemandResponse[]> {
		return this.http.get<FriendShipDemandResponse[]>(`${this.API_URL}/friendShipDemand/getFriendShipRequestsForIndividual`, {})
	}
}
