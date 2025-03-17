import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {groupMessageResponse} from "../../../types/groupChat/groupChat.types";

@Injectable({
	providedIn: 'root'
})
export class GroupChatService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {
	}

	getGroupMessages(groupId: number): Observable<groupMessageResponse[]> {
		return this.http.get<groupMessageResponse[]>(`${this.API_URL}/groupMessages/${groupId}`, {})
	}
}