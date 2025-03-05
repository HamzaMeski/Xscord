import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Store} from "@ngrx/store";
import {connectionEstablished, connectionLost, receiveMessage} from "../../../ngrx/actions/peerChat/peerChat.actions";


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
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			reconnectDelay: 5000,
		});
	}

	connect(): void {
		if (!this.stompClient.active) {
			this.stompClient.activate();
		}
	}

	disconnect(): void {
		if (this.stompClient.active) {
			this.stompClient.deactivate();
		}
	}

	private subscribeToMessages(): void {

		// Get the user ID from the JWT token
		const token = localStorage.getItem('authUserToken');
		const decodedToken = this.decodeJwt(token);
		const userId = decodedToken?.userId;

		// Subscribe to user-specific topic
		const subscription = this.stompClient.subscribe(`/topic/messages.${userId}`, message => {
			const newMessage = JSON.parse(message.body);
			this.store.dispatch(receiveMessage({ response: newMessage }));
		});

	}

	private decodeJwt(token: string | null): any {
		if(token) {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			return JSON.parse(window.atob(base64));
		}
	}

	sendMessage(receiverId: number, content: string): void {
		const message = { receiverId, content };

		this.stompClient.publish({
			destination: '/app/chat.sendMessage',
			body: JSON.stringify(message)
		});
	}
}