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
				console.log('WebSocket Connected!');
				this.connected = true;
				this.store.dispatch(connectionEstablished());
				this.subscribeToMessages();
			},
			onDisconnect: () => {
				console.log('WebSocket Disconnected!');
				this.connected = false;
				this.store.dispatch(connectionLost());
			},
			onStompError: (frame) => {
				console.error('STOMP error:', frame);
			},
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			reconnectDelay: 5000,
			debug: (str) => {
				console.log('STOMP:', str);
			}
		});
	}

	connect(): void {
		console.log('Activating WebSocket connection...');
		if (!this.stompClient.active) {
			this.stompClient.activate();
		}
	}

	disconnect(): void {
		console.log('Deactivating WebSocket connection...');
		if (this.stompClient.active) {
			this.stompClient.deactivate();
		}
	}

	private subscribeToMessages(): void {
		if (!this.connected) {
			console.error('Cannot subscribe: not connected');
			return;
		}

		console.log('Setting up subscription...');

		// Get the user ID from the JWT token
		const token = localStorage.getItem('authUserToken');
		const decodedToken = this.decodeJwt(token);
		const userId = decodedToken?.userId;

		if (!userId) {
			console.error('No user ID found in token');
			return;
		}

		console.log('Subscribing for user ID:', userId);

		// Subscribe to user-specific topic
		const subscription = this.stompClient.subscribe(`/topic/messages.${userId}`, message => {
			console.log('Raw message received:', message);
			try {
				const newMessage = JSON.parse(message.body);
				console.log('Parsed message:', newMessage);
				this.store.dispatch(receiveMessage({ response: newMessage }));
			} catch (error) {
				console.error('Error parsing message:', error);
			}
		});

		console.log('Subscribed with ID:', subscription.id);
	}

	private decodeJwt(token: string | null): any {
		if (!token) return null;
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			return JSON.parse(window.atob(base64));
		} catch (e) {
			console.error('Error decoding JWT:', e);
			return null;
		}
	}

	sendMessage(receiverId: number, content: string): void {
		if (!this.connected) {
			console.error('Cannot send message: not connected');
			return;
		}

		const message = { receiverId, content };
		console.log('Preparing to send message:', message);

		try {
			this.stompClient.publish({
				destination: '/app/chat.sendMessage',
				body: JSON.stringify(message)
			});
			console.log('Message sent successfully');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	}
}