import {BaseSocketService} from "./baseSocket.service";
import {Store} from "@ngrx/store";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {receiveGroupMessage} from "../../../ngrx/actions/groupChat/groupChat.actions";


@Injectable({
	providedIn: 'root'
})
export class GroupChatSocketService extends BaseSocketService {
	private activeSubscriptions: Map<number, { unsubscribe: () => void }> = new Map();

	constructor(private store: Store) {
		super();
		this.stompClient.onConnect = () => {
			this.connected = true;
		};
		this.stompClient.onDisconnect = () => {
			this.connected = false;
			this.activeSubscriptions.clear();
		};
	}

	subscribeToGroup(groupId: number): void {
		if (this.activeSubscriptions.has(groupId)) {
			return;
		}

		const subscription = this.stompClient.subscribe(`/topic/group.messages.${groupId}`, message => {
			try {
				const newMessage = JSON.parse(message.body);
				this.store.dispatch(receiveGroupMessage({ response: newMessage }));
			} catch (error) {
				console.error('Error processing group message:', error);
			}
		});

		this.activeSubscriptions.set(groupId, subscription);
	}

	unsubscribeFromGroup(groupId: number): void {
		const subscription = this.activeSubscriptions.get(groupId);
		if (subscription) {
			subscription.unsubscribe();
			this.activeSubscriptions.delete(groupId);
		}
	}

	sendMessage(groupId: number, content: string): Observable<void> {
		if (!this.stompClient.active || !this.connected) {
			return throwError(() => new Error('No active connection'));
		}

		return new Observable(subscriber => {
			try {
				const message = { groupId, content };
				this.stompClient.publish({
					destination: '/app/group.chat.sendMessage',
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