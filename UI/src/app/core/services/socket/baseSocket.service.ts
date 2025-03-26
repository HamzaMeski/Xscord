import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class BaseSocketService {
	protected stompClient: Client;
	protected connected = false;

	constructor() {
		this.stompClient = new Client({
			webSocketFactory: () => new SockJS(`http://localhost:8080/ws-message`),
			connectHeaders: {
				Authorization: `Bearer ${localStorage.getItem('authUserToken')}`
			},
			onStompError: (frame) => {
				console.error('STOMP error:', frame);
			},
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			reconnectDelay: 5000,
		});
	}

	connect(): Observable<void> {
		return new Observable(subscriber => {
			this.stompClient.connectHeaders = {
				Authorization: `Bearer ${localStorage.getItem('authUserToken')}`
			};

			if (!this.stompClient.active) {
				const originalOnConnect = this.stompClient.onConnect;
				const originalOnStompError = this.stompClient.onStompError;

				this.stompClient.onConnect = (frame) => {
					originalOnConnect?.(frame);
					subscriber.next();
					subscriber.complete();
					this.stompClient.onConnect = originalOnConnect;
				};

				this.stompClient.onStompError = (frame) => {
					originalOnStompError?.(frame);
					subscriber.error(new Error(frame?.headers?.['message'] || 'Connection failed'));
					this.stompClient.onStompError = originalOnStompError;
				};

				this.stompClient.activate();
			} else {
				subscriber.next();
				subscriber.complete();
			}
		});
	}

	disconnect(): Observable<void> {
		return new Observable(subscriber => {
			if (this.stompClient.active) {
				const originalOnDisconnect = this.stompClient.onDisconnect;

				this.stompClient.onDisconnect = (frame) => {
					originalOnDisconnect?.(frame);
					subscriber.next();
					subscriber.complete();
					this.stompClient.onDisconnect = originalOnDisconnect;
				};

				this.stompClient.deactivate();
			} else {
				subscriber.next();
				subscriber.complete();
			}
		});
	}
}