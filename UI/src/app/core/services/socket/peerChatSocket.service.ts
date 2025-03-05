import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Store} from "@ngrx/store";
import {connectionEstablished, connectionLost, receiveMessage} from "../../../ngrx/actions/peerChat/peerChat.actions";
import {Observable, throwError} from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class PeerChatSocketService {
	private stompClient: Client;
	private connected = false;

	constructor(private store: Store) {
		this.stompClient = new Client({
			webSocketFactory: () => new SockJS(`http://localhost:8080/ws-message`),
			connectHeaders: {
				Authorization: `Bearer ${localStorage.getItem('authUserToken')}`
			},
			onConnect: () => {
				this.connected = true;
				this.store.dispatch(connectionEstablished());
				this.subscribeToMessages();
			},
			onDisconnect: () => {
				this.connected = false;
				this.store.dispatch(connectionLost());
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
			// Update headers with fresh token
			this.stompClient.connectHeaders = {
				Authorization: `Bearer ${localStorage.getItem('authUserToken')}`
			};

			if (!this.stompClient.active) {
				// Store original callbacks
				const originalOnConnect = this.stompClient.onConnect;
				const originalOnStompError = this.stompClient.onStompError;

				// Enhance callbacks to handle the Observable
				this.stompClient.onConnect = (frame) => {
					originalOnConnect?.(frame);
					subscriber.next();
					subscriber.complete();
					// Restore original callback
					this.stompClient.onConnect = originalOnConnect;
				};

				this.stompClient.onStompError = (frame) => {
					originalOnStompError?.(frame);
					subscriber.error(new Error(frame?.headers?.['message'] || 'Connection failed'));
					// Restore original callback
					this.stompClient.onStompError = originalOnStompError;
				};

				this.stompClient.activate();
			} else {
				// Already connected
				subscriber.next();
				subscriber.complete();
			}
		});
	}

	disconnect(): Observable<void> {
		return new Observable(subscriber => {
			if (this.stompClient.active) {
				// Store original callback
				const originalOnDisconnect = this.stompClient.onDisconnect;

				this.stompClient.onDisconnect = (frame) => {
					originalOnDisconnect?.(frame);
					subscriber.next();
					subscriber.complete();
					// Restore original callback
					this.stompClient.onDisconnect = originalOnDisconnect;
				};

				this.stompClient.deactivate();
			} else {
				subscriber.next();
				subscriber.complete();
			}
		});
	}

	private subscribeToMessages(): void {
		const token = localStorage.getItem('authUserToken');
		const decodedToken = this.decodeJwt(token);
		const userId = decodedToken?.userId;

		if (!userId) {
			console.error('No user ID found in token');
			return;
		}

		this.stompClient.subscribe(`/topic/messages.${userId}`, message => {
			try {
				const newMessage = JSON.parse(message.body);
				this.store.dispatch(receiveMessage({ response: newMessage }));
			} catch (error) {
				console.error('Error processing message:', error);
			}
		});
	}

	private decodeJwt(token: string | null): any {
		if (!token) return null;
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			return JSON.parse(window.atob(base64));
		} catch (error) {
			console.error('Error decoding JWT:', error);
			return null;
		}
	}

	sendMessage(receiverId: number, content: string): Observable<void> {
		if (!this.stompClient.active || !this.connected) {
			return throwError(() => new Error('No active connection'));
		}

		return new Observable(subscriber => {
			try {
				const message = { receiverId, content };
				this.stompClient.publish({
					destination: '/app/chat.sendMessage',
					body: JSON.stringify(message)
				});
				subscriber.next();
				subscriber.complete();
			} catch (error) {
				subscriber.error(error);
			}
		});
	}
}