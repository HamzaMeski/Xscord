import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Store} from "@ngrx/store";
import {connectionEstablished, connectionLost, receiveMessage} from "../../../ngrx/actions/peerChat/peerChat.actions";


@Injectable({
	providedIn: 'root'
})
export class PeerChatSocketService {
	private stompClient: Client

	constructor(
		private store: Store
	) {
		this.stompClient = new Client({
			webSocketFactory: () => new SockJS(`http://localhost:8080/ws-message`),
			connectHeaders: {
				Authorization: `Bearer ${localStorage.getItem('authUserToken')}`
			},
			onConnect: () => {
				this.store.dispatch(connectionEstablished())
				this.subscribeToMessages()
			}
		})
	}

	connect(): void {
		this.stompClient.activate()
	}

	private subscribeToMessages(): void {
		this.stompClient.subscribe('/user/queue/messages', message => {
			const newMessage = JSON.parse(message.body)
			this.store.dispatch(receiveMessage({response: newMessage}))
		})
	}

	sendMessage(receiverId: number, content: string): void {
		this.stompClient.publish({
			destination: '/app/chat.sendMessage',
			body: JSON.stringify({receiverId, content})
		})
	}
}