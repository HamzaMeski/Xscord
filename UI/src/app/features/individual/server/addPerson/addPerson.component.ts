import {Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {closeAddPersonModal} from "../../../../ngrx/actions/modal/addPerson.actions";
import {
	selectGetIndividualFriendsError,
	selectGetIndividualFriendsLoading,
	selectGetIndividualFriendsResponse
} from "../../../../ngrx/selectors/friends/friends.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {getIndividualFriends} from "../../../../ngrx/actions/friends/friends.actions";
import {ServerJoinDemandRequest} from "../../../../core/types/server/serverJoinDemand.types";
import {Router} from "@angular/router";
import {sendServerInvitation} from "../../../../ngrx/actions/server/serverInvitation.actions";
import {sendMessage} from "../../../../ngrx/actions/peerChat/peerChat.actions";
import {ServerResponse} from "../../../../core/types/server/server.types";
import {selectServerResponse} from "../../../../ngrx/selectors/server/server.selectors";
import {getServer} from "../../../../ngrx/actions/server/server.actions";

@Component({
	standalone: true,
	selector: 'add-person',
	imports: [
		FaIconComponent,
		AsyncPipe,
		NgIf,
		NgForOf
	],
	template: `
        <section class="bg-[#313338] w-[440px] p-4 rounded-md">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-white font-semibold">Invite friends to hamza me ski's server</h2>
                <button (click)="closeModal()" class="text-gray-400 hover:text-white cursor-pointer">
                    <fa-icon [icon]="faTimes"></fa-icon>
                </button>
            </div>

            <!-- Search Bar -->
            <div class="relative mb-4">
                <input type="text"
                       placeholder="Search for friends"
                       class="w-full bg-[#1E1F22] text-gray-200 px-3 py-2 rounded-md focus:outline-none">
                <fa-icon [icon]="faSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></fa-icon>
            </div>

            <!-- User List -->
            <div class="space-y-2 mb-6">
                <!--loading data checker-->
                <div *ngIf="(individualFriendsLoading$ | async) || (currentAuthUserLoading$ | async)">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>

                <div *ngIf="!(individualFriendsLoading$ | async) && !(currentAuthUserLoading$ | async)" class="h-full bg-[#313338] ">
                    <div *ngIf="individualFriends$ | async as individualFriends">
                        <div *ngIf="individualFriends.length" class="flex flex-col gap-4">

                            <!-- Friends Count -->
                            <div class="text-[#949BA4] text-xs font-semibold uppercase tracking-wide px-2">
                                ALL FRIENDS — {{individualFriends.length}}
                            </div>

                            <!-- Friends List -->
                            <div class="flex flex-col">
                                <div *ngFor="let friend of individualFriends">
	                                <div *ngIf="currentAuthUser$ | async as currentAuthUser" class="flex items-center justify-between p-2 hover:bg-[#2E3035] rounded group transition-colors">
                                        <!-- Friend Info -->
                                        <div class="flex items-center gap-3">
                                            <div class="w-8 h-8 flex items-center justify-center bg-[#5865F2] rounded-full overflow-hidden flex-shrink-0">
                                                <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                            </div>
                                            <div >
                                                <!-- Friend Name -->
                                                <div class="flex flex-col">
                                                    <div *ngIf="currentAuthUser.id == friend.individual1.id" class="text-white font-medium">
                                                        {{ friend.individual2.displayName }}
                                                    </div>
                                                    <div *ngIf="currentAuthUser.id == friend.individual2.id" class="text-white font-medium">
                                                        {{ friend.individual1.displayName }}
                                                    </div>
                                                    <div class="text-[#949BA4] text-sm">
                                                        Offline
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Invite Button -->
                                        <div  *ngIf="currentAuthUser.id == friend.individual1.id">
                                            <button (click)="sendServerInvitation(friend.individual2.id)" class="bg-[#248046] text-white px-4 py-1 text-sm rounded-md hover:bg-[#1a6334]">
                                                Invite
                                            </button>
                                        </div>
                                        <div  *ngIf="currentAuthUser.id == friend.individual2.id">
                                            <button (click)="sendServerInvitation(friend.individual1.id)" class="bg-[#248046] text-white px-4 py-1 text-sm rounded-md hover:bg-[#1a6334]">
                                                Invite
                                            </button>
                                        </div>
	                                </div>
                                </div>
                            </div>
                        </div>
	                    
                    </div>

                    <!-- Error States -->
                    <div *ngIf="individualFriendsError$ | async" class="text-[#ED4245] p-4 rounded bg-[#2B2D31] mt-4">
                        Encountered an error while loading friends list. Please try again later.
                    </div>
                    <div *ngIf="currentAuthUserError$ | async" class="text-[#ED4245] p-4 rounded bg-[#2B2D31] mt-4">
                        Encountered an error while loading your profile. Please try again later.
                    </div>
                </div>

            </div>

            <!-- Invite Link Section -->
            <div class="mt-4 pt-4 border-t border-gray-700">
                <div class="text-gray-400 text-sm mb-2">OR SEND A SERVER INVITE LINK TO A FRIEND</div>
                <div class="flex gap-2">
                    <input type="text"
                           value="https://discord.gg/kXgkeyrr"
                           readonly
                           class="flex-1 bg-[#1E1F22] text-gray-200 px-3 py-2 rounded-md focus:outline-none">
                    <button class="bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4]">
                        Copy
                    </button>
                </div>
            </div>
        </section>
	`
})
export class addPersonComponent implements OnInit{
	faDiscord = faDiscord
	faSearch = faSearch
	faTimes = faTimes

	individualFriends$
	individualFriendsLoading$
	individualFriendsError$

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	serverId!: number

	server$
	server!: ServerResponse | null

	constructor(
		private store: Store,
		private router: Router
	) {
		this.individualFriends$ = this.store.select(selectGetIndividualFriendsResponse)
		this.individualFriendsLoading$ = this.store.select(selectGetIndividualFriendsLoading)
		this.individualFriendsError$ = this.store.select(selectGetIndividualFriendsError)

		this.currentAuthUser$ = this.store.select(selectUserProfile)
		this.currentAuthUserLoading$ = this.store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = this.store.select(selectUserProfileError)

		this.server$ = this.store.select(selectServerResponse)
	}

	closeModal() {
		this.store.dispatch(closeAddPersonModal())
	}

	ngOnInit(): void {
		this.store.dispatch(getIndividualFriends())

		/*this.route.params.subscribe(params => {
			console.log('PARAMS: ', params)
			this.serverId = Number(params['serverId'])
			console.log('SERVER_ID: ',this.serverId)
		})*/

		// TODO: this approach is fragile it must be changed: Hm
		const urlSegments = this.router.url.split('/')
		this.serverId = Number(urlSegments[3])
		this.store.dispatch(getServer({serverId: this.serverId}))

		this.server$.subscribe(val => this.server = val)
	}

	sendServerInvitation(receiverId: number, ) {
		const request :ServerJoinDemandRequest = {
			serverId: this.serverId,
			receiverId: receiverId,
			invitationLink: this.generateInvitationLink()
		}

		this.store.dispatch(sendServerInvitation({request}))
		this.store.dispatch(sendMessage({
			request: {
				receiverId: receiverId,
				content: this.generateInvitationLink()
			}
		}))
	}

	generateInvitationLink() {
		return `https://discord.gg/${this.server?.name}/join/${this.server?.id}/${new Date()}`
	}
}
