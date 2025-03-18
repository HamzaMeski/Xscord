import {BaseSocketService} from "./baseSocket.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {receiveGroupMessage} from "../../../ngrx/actions/groupChat/groupChat.actions";


@Injectable({
	providedIn: 'root'
})
export class GroupChatSocketService extends BaseSocketService {
	private activeSubscriptions: Map<number, { unsubscribe: () => void }> = new Map();
	private pendingGroupId: number | null = null;

	constructor(private store: Store) {
		super();
		this.stompClient.onConnect = () => {
			this.connected = true;
			if (this.pendingGroupId !== null) {
				this.doSubscribeToGroup(this.pendingGroupId);
				this.pendingGroupId = null;
			}
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

		if (this.connected) {
			this.doSubscribeToGroup(groupId);
		} else {
			this.pendingGroupId = groupId;
			// Make sure to wait for the connection before proceeding
			this.connect().subscribe({
				next: () => {
					// Now we're connected, do the subscription
					if (this.pendingGroupId === groupId) {
						this.doSubscribeToGroup(groupId);
						this.pendingGroupId = null;
					}
				},
				error: (error) => console.error('Error connecting:', error)
			});
		}
	}

	private doSubscribeToGroup(groupId: number): void {
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
		if (!this.connected) {
			return new Observable(subscriber => {
				this.connect().subscribe({
					next: () => {
						const message = { groupId, content };
						this.stompClient.publish({
							destination: '/app/group.chat.sendMessage',
							body: JSON.stringify(message)
						});
						subscriber.next();
						subscriber.complete();
					},
					error: (error) => subscriber.error(error)
				});
			});
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