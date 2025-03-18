import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {connectionEstablished, connectionLost, receiveMessage} from "../../../ngrx/actions/peerChat/peerChat.actions";
import {Observable, throwError} from "rxjs";
import {BaseSocketService} from "./baseSocket.service";


@Injectable({
	providedIn: 'root'
})
export class PeerChatSocketService extends BaseSocketService {
	constructor(private store: Store) {
		super();
		this.stompClient.onConnect = () => {
			this.connected = true;
			this.store.dispatch(connectionEstablished());
			this.subscribeToMessages();
		};
		this.stompClient.onDisconnect = () => {
			this.connected = false;
			this.store.dispatch(connectionLost());
		};
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