import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupResponse} from "../../../types/server/group.types";


@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {}

	getServerGroups(serverId: number): Observable<GroupResponse[]> {
		return this.http.get<GroupResponse[]>(`${this.API_URL}/groups/server/${serverId}`, {})
	}
}