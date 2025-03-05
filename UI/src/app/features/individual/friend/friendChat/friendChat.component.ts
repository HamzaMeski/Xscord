import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadSelectedFriend} from "../../../../ngrx/actions/friends/friends.actions";
import {
	selectSelectedFriendError,
	selectSelectedFriendLoading,
	selectSelectedFriendResponse
} from "../../../../ngrx/selectors/friends/friends.selectors";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {CommonModule} from "@angular/common";
import {
	selectMeIsConnected,
	selectPeerChatHistoryConversation,
	selectPeerChatHistoryError,
	selectPeerChatHistoryLoading
} from "../../../../ngrx/selectors/peerChat/peerChat.selectors";
import {
	addSenderMessageToConversation,
	connectToChat,
	loadChatHistory,
	sendMessage
} from "../../../../ngrx/actions/peerChat/peerChat.actions";
import {FormsModule} from "@angular/forms";
import {IndividualResponse} from "../../../../core/types/individual/individual.types";


@Component({
	standalone: true,
	selector: 'friend-chat',
	imports: [
		FaIconComponent,
		CommonModule,
		FormsModule
	],
	template: `
		<section *ngIf="(currentAuthUserLoading$ | async) || (selectedFriendLoading$ | async)" class="h-screen flex flex-col bg-[#313338]">
            <div  class="flex flex-col h-full">
                <!-- Top Navigation Bar -->
                <div class="flex items-center gap-2 bg-[#1E1F22] px-4 py-3 shadow-md flex-shrink-0">
                    <div class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-[#5865F2]">
                        <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
                    </div>
                    <strong class="text-white font-medium">...</strong>
                </div>

                <main class="flex flex-1 min-h-0">
                    <!-- Main Chat Area -->
                    <div class="flex-1 flex flex-col min-h-0">
                        
                        <!-- Chat Content -->
                        <div
                             class="flex flex-col flex-1 min-h-0">
                            <!-- Messages Container -->
                            <div #messageContainer class="flex-1 overflow-y-auto">
                                <!-- Welcome Message -->
                                <div class="px-4 py-6">
                                    <div class="mb-8">
                                        <div class="w-20 h-20 mb-4 overflow-hidden rounded-full bg-[#5865F2] flex items-center justify-center">
                                            <fa-icon [icon]="faDiscord" class="text-4xl text-white"></fa-icon>
                                        </div>
                                        <h2 class="text-2xl font-bold text-white mb-2">...</h2>
                                        <p class="text-[#949BA4] mb-4">This is the beginning of your direct message history with ...</p>
                                        <div class="flex items-center gap-4 text-sm text-[#949BA4]">
                                            <span>No servers in common</span>
                                            <div class="flex gap-2">
                                                <button class="px-3 py-1 bg-[#2B2D31] hover:bg-[#404249] rounded text-white transition-colors">
                                                    Remove Friend
                                                </button>
                                                <button class="px-3 py-1 bg-[#2B2D31] hover:bg-[#404249] rounded text-white transition-colors">
                                                    Block
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Message Input -->
                            <div class="px-4 py-4 flex-shrink-0 bg-[#313338] mt-auto">
                                <div class="flex items-center gap-2 bg-[#383A40] rounded-lg px-4 py-2.5">
                                    <button class="text-[#B5BAC1] hover:text-white transition-colors">
                                        <fa-icon [icon]="faCirclePlus" class="text-xl"></fa-icon>
                                    </button>
                                    <input type="text"
                                           placeholder="Message ..."
                                           class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none">
                                    <button
                                            class="px-4 py-1 bg-[#5865F2] text-white rounded hover:bg-[#4752C4] transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="w-[340px] bg-[#2B2D31] border-l border-[#1F2023] flex-shrink-0">
                        <div class="h-[180px] bg-[#1E1F22]"></div>
                        <div class="flex flex-col px-4 -mt-16">
                            <div class="w-[120px] h-[120px] rounded-full border-8 border-[#2B2D31] overflow-hidden bg-[#5865F2] flex items-center justify-center mb-3">
                                <fa-icon [icon]="faDiscord" class="text-4xl text-white"></fa-icon>
                            </div>
                            <h2 class="text-xl font-bold text-white mb-4">{{ selectedFriend.displayName }}</h2>

                            <!-- About Section -->
                            <div class="bg-[#232428] rounded-lg p-3 mb-4">
                                <h3 class="text-[#949BA4] font-medium mb-2">ABOUT ME</h3>
                                <p class="text-[#DBDEE1] text-sm">{{ selectedFriend.bio }}</p>
                            </div>

                            <!-- Member Since -->
                            <div class="bg-[#232428] rounded-lg p-3">
                                <h3 class="text-[#949BA4] font-medium mb-2">MEMBER SINCE</h3>
                                <p class="text-[#DBDEE1] text-sm">{{ selectedFriend.createdAt }}</p>
                            </div>

                            <!-- View Profile Button -->
                            <button class="mt-4 w-full px-4 py-2 bg-[#4E505C] text-white rounded hover:bg-[#6D6F7B] transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </section>


        <section *ngIf="!(currentAuthUserLoading$ | async) && !(selectedFriendLoading$ | async)" class="h-screen flex flex-col bg-[#313338]">
            <div *ngIf="selectedFriend$ | async as selectedFriend" class="flex flex-col h-full">
                <!-- Top Navigation Bar -->
                <div class="flex items-center gap-2 bg-[#1E1F22] px-4 py-3 shadow-md flex-shrink-0">
                    <div class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-[#5865F2]">
                        <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
                    </div>
                    <strong class="text-white font-medium">{{ selectedFriend.displayName }}</strong>
                </div>

                <main class="flex flex-1 min-h-0">
                    <!-- Main Chat Area -->
                    <div class="flex-1 flex flex-col min-h-0">
                        <!-- Error Message -->
                        <div *ngIf="chatHistoryError$ | async as error" class="text-red-500 px-4 py-2 flex-shrink-0">
                            {{ error }}
                        </div>

                        <!-- Loading State -->
                        <div *ngIf="(chatHistoryLoading$ | async)"
                             class="flex-1 flex items-center justify-center text-[#949BA4]">
                            Chat History loading...
                        </div>

                        <!-- Chat Content -->
                        <div *ngIf="!(chatHistoryLoading$ | async)"
                             class="flex flex-col flex-1 min-h-0">
                            <!-- Messages Container -->
                            <div #messageContainer class="flex-1 overflow-y-auto">
                                <!-- Welcome Message -->
                                <div class="px-4 py-6">
                                    <div class="mb-8">
                                        <div class="w-20 h-20 mb-4 overflow-hidden rounded-full bg-[#5865F2] flex items-center justify-center">
                                            <fa-icon [icon]="faDiscord" class="text-4xl text-white"></fa-icon>
                                        </div>
                                        <h2 class="text-2xl font-bold text-white mb-2">{{ selectedFriend.displayName }}</h2>
                                        <p class="text-[#949BA4] mb-4">This is the beginning of your direct message history with {{ selectedFriend.displayName }}</p>
                                        <div class="flex items-center gap-4 text-sm text-[#949BA4]">
                                            <span>No servers in common</span>
                                            <div class="flex gap-2">
                                                <button class="px-3 py-1 bg-[#2B2D31] hover:bg-[#404249] rounded text-white transition-colors">
                                                    Remove Friend
                                                </button>
                                                <button class="px-3 py-1 bg-[#2B2D31] hover:bg-[#404249] rounded text-white transition-colors">
                                                    Block
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Messages -->
                                    <div *ngIf="conversation$ | async as messages">
                                        <div *ngFor="let message of messages">
                                            <div *ngIf="messages.length" class="group hover:bg-[#2E3035] px-4 -mx-4 py-1">
                                                <!-- Current User Message -->
                                                <div *ngIf="message.sender.id == currentAuthUserId"
                                                     class="flex gap-4 items-start">
                                                    <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                        <div class="w-full h-full bg-red-500 flex items-center justify-center">
                                                            <fa-icon [icon]="faDiscord" class="text-lg text-white"></fa-icon>
                                                        </div>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div class="flex items-center gap-2 mb-1">
                                                            <span class="font-medium text-white">{{ message.sender.displayName }}</span>
                                                            <span class="text-xs text-[#949BA4]">{{ message.createdAt }}</span>
                                                        </div>
                                                        <p class="text-[#DBDEE1] break-words">{{ message.content }}</p>
                                                    </div>
                                                </div>

                                                <!-- Friend Message -->
                                                <div *ngIf="message.sender.id != currentAuthUserId"
                                                     class="flex gap-4 items-start">
                                                    <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                        <div class="w-full h-full bg-[#5865F2] flex items-center justify-center">
                                                            <fa-icon [icon]="faDiscord" class="text-lg text-white"></fa-icon>
                                                        </div>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div class="flex items-center gap-2 mb-1">
                                                            <span class="font-medium text-white">{{ message.sender.displayName }}</span>
                                                            <span class="text-xs text-[#949BA4]">{{ message.createdAt }}</span>
                                                        </div>
                                                        <p class="text-[#DBDEE1] break-words">{{ message.content }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Message Input -->
                            <div class="px-4 py-4 flex-shrink-0 bg-[#313338] mt-auto">
                                <div class="flex items-center gap-2 bg-[#383A40] rounded-lg px-4 py-2.5">
                                    <button class="text-[#B5BAC1] hover:text-white transition-colors">
                                        <fa-icon [icon]="faCirclePlus" class="text-xl"></fa-icon>
                                    </button>
                                    <input type="text"
                                           [(ngModel)]="newMessage"
                                           (keyup.enter)="sendMessage()"
                                           placeholder="Message {{ selectedFriend.displayName }}"
                                           class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none">
                                    <button (click)="sendMessage()"
                                            class="px-4 py-1 bg-[#5865F2] text-white rounded hover:bg-[#4752C4] transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="w-[340px] bg-[#2B2D31] border-l border-[#1F2023] flex-shrink-0">
                        <div class="h-[180px] bg-[#1E1F22]"></div>
                        <div class="flex flex-col px-4 -mt-16">
                            <div class="w-[120px] h-[120px] rounded-full border-8 border-[#2B2D31] overflow-hidden bg-[#5865F2] flex items-center justify-center mb-3">
                                <fa-icon [icon]="faDiscord" class="text-4xl text-white"></fa-icon>
                            </div>
                            <h2 class="text-xl font-bold text-white mb-4">{{ selectedFriend.displayName }}</h2>

                            <!-- About Section -->
                            <div class="bg-[#232428] rounded-lg p-3 mb-4">
                                <h3 class="text-[#949BA4] font-medium mb-2">ABOUT ME</h3>
                                <p class="text-[#DBDEE1] text-sm">{{ selectedFriend.bio }}</p>
                            </div>

                            <!-- Member Since -->
                            <div class="bg-[#232428] rounded-lg p-3">
                                <h3 class="text-[#949BA4] font-medium mb-2">MEMBER SINCE</h3>
                                <p class="text-[#DBDEE1] text-sm">{{ selectedFriend.createdAt }}</p>
                            </div>

                            <!-- View Profile Button -->
                            <button class="mt-4 w-full px-4 py-2 bg-[#4E505C] text-white rounded hover:bg-[#6D6F7B] transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </section>
  `
})
export class FriendChatComponent  implements OnInit, OnDestroy{
	faDiscord = faDiscord
	faCirclePlus = faCirclePlus

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	selectedFriend$
	selectedFriendLoading$
	selectedFriendError$

	selectedFriendId!:number
	currentAuthUserId!:number
	newMessage: string  = ''

	conversation$
	chatHistoryLoading$
	chatHistoryError$

	currentAuthUser!: IndividualResponse
	selectedFriend!: IndividualResponse
	submittedMessageId!: number


	constructor(
		private route: ActivatedRoute,
		private store: Store
	) {
		this.currentAuthUser$ = store.select(selectUserProfile)
		this.currentAuthUserLoading$ = store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = store.select(selectUserProfileError)

		this.selectedFriend$ = this.store.select(selectSelectedFriendResponse)
		this.selectedFriendLoading$ = this.store.select(selectSelectedFriendLoading)
		this.selectedFriendError$ = this.store.select(selectSelectedFriendError)

		this.conversation$ = this.store.select(selectPeerChatHistoryConversation)
		this.chatHistoryLoading$ = this.store.select(selectPeerChatHistoryLoading)
		this.chatHistoryError$ = this.store.select(selectPeerChatHistoryError)
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const friendId = Number(params['friendId'])
			this.selectedFriendId = friendId
			this.store.dispatch(loadSelectedFriend({friendId}))
		})

		this.currentAuthUser$.subscribe(user => {
			if(user) {
				this.currentAuthUser = user
				this.currentAuthUserId = user.id
			}
		})

		this.selectedFriend$.subscribe(user => {
			if(user) {
				this.selectedFriend = user
			}
		})

		this.store.dispatch(loadChatHistory({individual2Id: this.selectedFriendId}))

		this.conversation$.subscribe(
			con=>{
				if(con.length > 0) {
					this.submittedMessageId = con[con.length - 1].id + 1
				}else {
					this.submittedMessageId = 1
				}
			}
		)
	}

	sendMessage() {
		if(this.newMessage.trim()) {
			this.store.dispatch(sendMessage({
				request: {
					receiverId: this.selectedFriendId,
					content: this.newMessage.trim()
				}
			}))

			// add sender message to conversation
			this.store.dispatch(addSenderMessageToConversation({
				expectedResponse: {
					id: this.submittedMessageId,
					sender: this.currentAuthUser,
					receiver: this.selectedFriend,
					content: this.newMessage,
					isRead: false,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			}))

			this.newMessage = ''
		}
	}

	/* TODO: must clean up the subscriptions to avoid memory leak */
	ngOnDestroy():void {
	}
}
