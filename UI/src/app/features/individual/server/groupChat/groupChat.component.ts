import {Component, OnDestroy, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCirclePlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {getServerMembers} from "../../../../ngrx/actions/server/serverInvitation.actions";
import {
	selectServerMembersError,
	selectServerMembersLoading,
	selectServerMembersResponse
} from "../../../../ngrx/selectors/server/serverInvitation.selectors";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {loadUserProfile} from "../../../../ngrx/actions/userProfile/userProfile.actions";
import {getServer} from "../../../../ngrx/actions/server/server.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {
	selectServerFailure,
	selectServerLoading,
	selectServerResponse
} from "../../../../ngrx/selectors/server/server.selectors";
import {
	selectGroupMessagesError,
	selectGroupMessagesLoading,
	selectGroupMessagesResponse
} from "../../../../ngrx/selectors/groupChat/groupChat.selectors";
import {
	addSenderGroupMessageToConversation,
	loadGroupMessages,
	sendGroupMessage
} from "../../../../ngrx/actions/groupChat/groupChat.actions";
import {IndividualResponse} from "../../../../core/types/individual/individual.types";
import {GroupResponse} from "../../../../core/types/group/group.types";
import {
	selectGroupError,
	selectGroupLoading,
	selectGroupResponse
} from "../../../../ngrx/selectors/group/group.selectors";
import {GroupChatSocketService} from "../../../../core/services/socket/groupChatSocket.service";
import {Subscription} from "rxjs";


@Component({
	standalone: true,
	selector: 'group-chat',
	imports: [
		CommonModule,
		FaIconComponent,
		ReactiveFormsModule,
		FormsModule
	],
	template: `
    <section class="h-screen flex flex-col bg-[#313338]">
		  <div class="flex flex-col h-full">
		      <!-- Top Navigation Bar -->
		      <div class="flex items-center gap-2 bg-[#1E1F22] px-4 py-3 shadow-md flex-shrink-0">
		          <div>#</div>
			      <div *ngIf="server$ | async as server">
                      <strong class="text-white font-medium">{{server.name}}</strong>
                  </div>
		      </div>
		      
		      <main *ngIf="serverMembers$ | async as members" class="flex flex-1 min-h-0">
		          <!-- Main Chat Area -->
		          <div *ngIf="authUser$ | async as authUser" class="flex-1 flex flex-col min-h-0">
		              <!-- Chat Content -->
		              <div class="flex flex-col flex-1 min-h-0">
		                  <!-- Messages Container -->
		                  <div #messageContainer class="flex-1 overflow-y-auto">
		                      <div class="px-4 py-6">
		                          <!-- Welcome Message -->
			                      <div class="mb-8">
				                      WELCOME TO CHANNEL
			                      </div>
		                      </div>
		
		                      <!--Messages-->
		                      <div *ngIf="(messagesLoading$ | async)">
									messages loading...
		                      </div>
                              <div *ngIf="!(messagesLoading$ | async)">
	                              <div *ngIf="authUser$ | async as authUser">
                                      <div *ngIf="messages$ | async as messages">
                                          <div *ngFor="let message of messages">
                                              <div *ngIf="messages.length">
                                                  <!-- Current User Message -->
                                                  <div *ngIf="message.sender.id == authUser.id"
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
                                                          <p  class="text-[#DBDEE1] break-words">{{ message.content }}</p>
                                                      </div>
                                                  </div>

                                                  <!-- Other User Messages -->
                                                  <div *ngIf="message.sender.id != authUser.id"
                                                       class="flex gap-4 items-start">
                                                      <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                          <div class="w-full h-full bg-[#5865F2]flex items-center justify-center">
                                                              <fa-icon [icon]="faDiscord" class="text-lg text-white"></fa-icon>
                                                          </div>
                                                      </div>
                                                      <div class="flex-1 min-w-0">
                                                          <div class="flex items-center gap-2 mb-1">
                                                              <span class="font-medium text-white">{{ message.sender.displayName }}</span>
                                                              <span class="text-xs text-[#949BA4]">{{ message.createdAt }}</span>
                                                          </div>
                                                          <p  class="text-[#DBDEE1] break-words">{{ message.content }}</p>
                                                      </div>
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
                                         placeholder="Message Your Group..."
                                         class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none">
                                  <button (click)="sendMessage()"
                                          class="px-4 py-1 bg-[#5865F2] text-white rounded hover:bg-[#4752C4] transition-colors">
                                      Send
                                  </button>
		                      </div>
		                  </div>
		              </div>
		          </div>

                  <!-- Server Members -->
                  <div class="w-[240px] bg-[#2B2D31] flex-shrink-0">
                      <!-- Search Bar -->
                      <div class="p-3">
                          <div class="relative">
                              <input type="text"
                                     placeholder="Search"
                                     class="w-full bg-[#1E1F22] text-[#949BA4] text-sm px-2 py-1 rounded placeholder:text-[#949BA4] focus:outline-none">
                              <fa-icon [icon]="faSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-[#949BA4] text-sm"></fa-icon>
                          </div>
                      </div>

                      <div *ngIf="serverMembersLoading$ | async" class="px-3 py-2 text-[#949BA4] text-sm">
                          Loading members...
                      </div>

                      <div *ngIf="!(serverMembersLoading$ | async)" class="px-2">
                          <!-- Server Owner -->
                          <div class="mb-4">
                              <h3 class="px-2 text-xs font-semibold text-[#949BA4] uppercase tracking-wide mb-2">Server Owner — 1</h3>
                              <div *ngIf="server$ | async as server"
                                   class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373C] transition-colors cursor-pointer group">
                                  <div class="relative">
                                      <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                          <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                      </div>
                                      <div class="absolute bottom-0 right-0 w-3 h-3 bg-[#23A559] rounded-full border-2 border-[#2B2D31] group-hover:border-[#35373C]"></div>
                                  </div>
                                  <span class="text-[#DBDEE1] text-sm">{{server.ownerName}} <span class="text-[#FAA61A]">👑</span></span>
                              </div>
                          </div>

                          <!-- Members List -->
                          <div >
                              <h3 class="px-2 text-xs font-semibold text-[#949BA4] uppercase tracking-wide mb-2">Members — {{members.length}}</h3>
                              <div *ngFor="let member of members"
                                   class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373C] transition-colors cursor-pointer group">
                                  <div class="relative">
                                      <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                          <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                      </div>
                                      <div class="absolute bottom-0 right-0 w-3 h-3 bg-[#23A559] rounded-full border-2 border-[#2B2D31] group-hover:border-[#35373C]"></div>
                                  </div>
                                  <span class="text-[#949BA4] hover:text-[#DBDEE1] transition-colors text-sm">{{member.displayName}}</span>
                              </div>
                          </div>
                      </div>
                  </div>
		      </main>
		  </div>
    </section>
  `
})
export class GroupChatComponent implements OnInit, OnDestroy {
	faDiscord = faDiscord
	faCirclePlus = faCirclePlus
	faSearch = faSearch

	private subscriptions: Subscription[] = []

	authUser$
	authUserLoading$
	authUserError$

	serverMembers$
	serverMembersLoading$
	serverMembersError$

	group$
	groupLoading$
	groupError$

	server$
	serverLoading$
	serverError$

	messages$
	messagesLoading$
	messagesError$

	newMessage: string  = ''
	groupId!:number
	authUser!: IndividualResponse
	authUserId!:number
	group!:GroupResponse
	submittedMessageId!:number


	constructor(
		private store: Store,
		private router: Router,
		private route: ActivatedRoute,
		private groupChatSocketService: GroupChatSocketService
	){
		this.authUser$ = this.store.select(selectUserProfile)
		this.authUserLoading$ = this.store.select(selectUserProfileLoading)
		this.authUserError$ = this.store.select(selectUserProfileError)

		this.serverMembers$ = this.store.select(selectServerMembersResponse)
		this.serverMembersLoading$ = this.store.select(selectServerMembersLoading)
		this.serverMembersError$ = this.store.select(selectServerMembersError)

		this.server$ = this.store.select(selectServerResponse)
		this.serverLoading$ = this.store.select(selectServerLoading)
		this.serverError$ = this.store.select(selectServerFailure)

		this.group$ = this.store.select(selectGroupResponse)
		this.groupLoading$ = this.store.select(selectGroupLoading)
		this.groupError$ = this.store.select(selectGroupError)

		this.messages$ = this.store.select(selectGroupMessagesResponse)
		this.messagesLoading$ = this.store.select(selectGroupMessagesLoading)
		this.messagesError$ = this.store.select(selectGroupMessagesError)


	}

	ngOnInit(): void {
		this.store.dispatch(loadUserProfile())

		this.store.dispatch(getServerMembers({serverId: this.getServerId()}))

		this.store.dispatch(getServer({serverId: this.getServerId()}))

		this.subscriptions.push(
			this.route.params.subscribe(params => {
				const groupId = +params['groupId'];
				this.groupId = groupId
				console.log('chat init: ', groupId)
				this.store.dispatch(loadGroupMessages({groupId: groupId}))

				// Subscribe to group messages
				this.groupChatSocketService.subscribeToGroup(groupId)
			}),

			this.authUser$.subscribe(user => {
				if(user) {
					this.authUser = user
					this.authUserId = user.id
				}
			}),

			this.group$.subscribe(group=> {
				if(group) {
					this.group = group
				}
			}),

			this.messages$.subscribe(
				con=>{
					console.log('MESSAGES:',con)
					if(con.length > 0) {
						this.submittedMessageId = con[con.length - 1].id + 1
					}else {
						this.submittedMessageId = 1
					}
				}
			)
		)
	}

	/* TODO: id shouldn't get server ID this way, I set it here just for testing purposes I will handle it later# */
	getServerId(): number {
		const urlSegments = this.router.url.split('/')
		return Number(urlSegments[3])
	}

	sendMessage() {
		if(this.newMessage.trim()) {
			this.store.dispatch(sendGroupMessage({
				request: {
					groupId: this.groupId,
					content: this.newMessage.trim()
				}
			}))

			this.newMessage = ''
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
}
