import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGear, faUser} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {
	selectGetIndividualFriendsError,
	selectGetIndividualFriendsLoading,
	selectGetIndividualFriendsResponse
} from "../../../ngrx/selectors/friends/friends.selectors";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../ngrx/selectors/userProfile/userProfile.selectors";
import {loadUserProfile} from "../../../ngrx/actions/userProfile/userProfile.actions";
import {getIndividualFriends} from "../../../ngrx/actions/friends/friends.actions";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IndividualResponse} from "../../../core/types/individual/individual.types";
import {filter} from "rxjs";
import {loadChatHistory} from "../../../ngrx/actions/peerChat/peerChat.actions";


@Component({
	standalone: true,
	selector: 'friend',
	imports: [
		RouterLink,
		FontAwesomeModule,
		RouterOutlet,
		AsyncPipe,
		NgIf,
		NgForOf
	],
	template: `
        <section class="flex h-full w-full">
            <div class="w-60 flex flex-col h-full bg-[#2B2D31]">
                <div class="flex-1 flex flex-col min-h-0">
                    <!-- Search Bar -->
                    <div class="px-2 pt-2">
                        <div class="bg-[#1E1F22] rounded-md p-1">
                            <input type="text"
                                   placeholder="Find or start a conversation"
                                   class="w-full bg-transparent text-[#949BA4] text-sm px-2 py-1 border-none focus:ring-0 focus:outline-none placeholder-[#949BA4]">
                        </div>
                    </div>

                    <!-- Friends Section -->
                    <div class="px-2 mt-2">
                        <a routerLink="/individual/friend/mng"
                           class="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#404249] text-[#949BA4] hover:text-white transition-colors">
                            <fa-icon [icon]="faUser" class="w-5 h-5"></fa-icon>
                            <span class="font-medium">Friends</span>
                        </a>
                    </div>
	                

                    <!-- Direct Messages Section -->
                    <div class="px-2 mt-4">
                        <div class="flex items-center justify-between px-2 mb-2">
                            <span class="text-xs font-semibold text-[#949BA4]">DIRECT MESSAGES</span>
                            <button class="text-[#949BA4] hover:text-white transition-colors text-sm">+</button>
                        </div>

                        <!-- Loading State -->
                        <div *ngIf="(individualFriendsLoading$ | async) || (currentAuthUserLoading$ | async)"
                             class="flex justify-center py-4">
                            <svg class="animate-spin h-5 w-5 text-[#949BA4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>

                        <!-- Friends List -->
                        <div *ngIf="!(individualFriendsLoading$ | async) && !(currentAuthUserLoading$ | async)"
                             class="space-y-0.5 overflow-y-auto">
                            <div *ngIf="currentAuthUser$ | async as currentAuthUser">
                                <div *ngIf="individualFriends$ | async as individualFriends">
                                    <div *ngFor="let friend of individualFriends">
                                        <!-- Friend Item (individual1) -->
                                        <div *ngIf="currentAuthUser.id == friend.individual1.id">
                                            <a 
	                                            [routerLink]="['/individual/friend/chat', friend.individual2.id]"
                                                [state]="{friendId: friend.individual2.id}"
                                               class="flex items-center gap-2 px-2 py-2 rounded group hover:bg-[#404249] transition-colors">
                                                <div class="relative">
                                                    <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                                        <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                                    </div>
                                                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-[#23A559] rounded-full border-2 border-[#2B2D31]"></div>
                                                </div>
                                                <span class="text-[#949BA4] group-hover:text-white transition-colors">{{ friend.individual2.displayName }}</span>
                                            </a>
                                        </div>

                                        <!-- Friend Item (individual2) -->
                                        <div *ngIf="currentAuthUser.id == friend.individual2.id">
                                            <a
	                                            [routerLink]="['/individual/friend/chat', friend.individual1.id]"
	                                            [state]="{friendId: friend.individual1.id}"
											
                                               class="flex items-center gap-2 px-2 py-2 rounded group hover:bg-[#404249] transition-colors">
                                                <div class="relative">
                                                    <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                                        <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                                    </div>
                                                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-[#23A559] rounded-full border-2 border-[#2B2D31]"></div>
                                                </div>
                                                <span class="text-[#949BA4] group-hover:text-white transition-colors">{{ friend.individual1.displayName }}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- User Profile Bar -->
                <div *ngIf="currentAuthUser$ | async as currentAuthUser" class="mt-auto bg-[#232428] p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="relative">
                            <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
                            </div>
                            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23A559] rounded-full border-2 border-[#232428]"></div>
                        </div>
                        <span class="text-sm font-medium text-white">{{ currentAuthUser.displayName }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="text-[#949BA4] hover:text-white transition-colors">
                            <fa-icon [icon]="faGear" class="w-4 h-4"></fa-icon>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <router-outlet></router-outlet>
            </div>
        </section>
  `
})
export class FriendComponent implements OnInit {
	faDiscord = faDiscord
	faUser = faUser
	faGear = faGear

	individualFriends$
	individualFriendsLoading$
	individualFriendsError$

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	currentAuthUser!: IndividualResponse | null

	constructor(
		private store: Store,
		private router: Router
	) {
		this.individualFriends$ = store.select(selectGetIndividualFriendsResponse)
		this.individualFriendsLoading$ = store.select(selectGetIndividualFriendsLoading)
		this.individualFriendsError$ = store.select(selectGetIndividualFriendsError)

		this.currentAuthUser$ = store.select(selectUserProfile)
		this.currentAuthUserLoading$ = store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = store.select(selectUserProfileError)

		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
			const state = this.router.getCurrentNavigation()?.extras.state
			if(state?.['friendId']) {
				console.log('here: ',state?.['friendId'])
				this.store.dispatch(loadChatHistory({individual2Id: state['friendId']}))
			}
		})
	}

	ngOnInit(): void {
		this.store.dispatch(loadUserProfile())
		this.store.dispatch(getIndividualFriends())
		this.currentAuthUser$.subscribe(user => {
			if(user) {
				this.currentAuthUser = user
			}
		})
	}
}
