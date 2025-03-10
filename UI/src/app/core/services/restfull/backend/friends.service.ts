import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendRowResponse, FriendShipDemandResponse} from "../../../types/friends /friends.types";
import {serverApiUrl} from "../../../../../environments/env";

@Injectable({
	providedIn: 'root'
})
export class FriendsService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {
	}

	// Connection to backend FriendShipDemandController
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

	// Connection to backend FriendsListController
	getIndividualFriends(): Observable<FriendRowResponse[]> {
		return this.http.get<FriendRowResponse[]>(`${this.API_URL}/friends/getIndividualFriends`, {})
	}
}
