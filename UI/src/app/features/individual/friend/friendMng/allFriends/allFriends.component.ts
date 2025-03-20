import {Component} from "@angular/core";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {Store} from "@ngrx/store";
import {
	selectGetIndividualFriendsError,
	selectGetIndividualFriendsLoading,
	selectGetIndividualFriendsResponse
} from "../../../../../ngrx/selectors/friends/friends.selectors";
import {
	selectUserProfile, selectUserProfileError,
	selectUserProfileLoading
} from "../../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {faComment, faEllipsisV, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
	standalone: true,
	selector: 'all-friends',
	imports: [
		AsyncPipe,
		FaIconComponent,
		NgForOf,
		NgIf,
	],
	template: `
        <section class="h-full flex ">
            <div class="flex-1  flex flex-col gap-4 ">
                <!--loading data checker-->
                <div *ngIf="(individualFriendsLoading$ | async) || (currentAuthUserLoading$ | async)">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>

                <!--all friends-->
                <div *ngIf="!(individualFriendsLoading$ | async) && !(currentAuthUserLoading$ | async)" class="h-full bg-[#313338] p-4">
                    <div *ngIf="individualFriends$ | async as individualFriends">
                        <div *ngIf="individualFriends.length" class="flex flex-col gap-4">
                            <!-- Search Bar -->
                            <div class="relative">
                                <input type="text"
                                       placeholder="Search"
                                       class="w-full bg-[#1E1F22] text-[#DBDEE1] placeholder-[#949BA4] px-4 py-2 rounded text-sm border-none focus:ring-0 focus:outline-none">
                                <fa-icon [icon]="faSearch"
                                         class="absolute right-4 top-1/2 -translate-y-1/2 text-[#949BA4] text-sm">
                                </fa-icon>
                            </div>

                            <!-- Friends Count -->
                            <div class="text-[#949BA4] text-xs font-semibold uppercase tracking-wide px-2">
                                ALL FRIENDS — {{individualFriends.length}}
                            </div>

                            <!-- Friends List -->
                            <div class="flex flex-col">
                                <div *ngFor="let friend of individualFriends"
                                     class="flex items-center justify-between p-2 hover:bg-[#2E3035] rounded group transition-colors">
                                    <!-- Friend Info -->
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 flex items-center justify-center bg-[#5865F2] rounded-full overflow-hidden flex-shrink-0">
                                            <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                                        </div>
                                        <div *ngIf="currentAuthUser$ | async as currentAuthUser">
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

                                    <!-- Action Buttons -->
                                    <div class="flex items-center gap-3">
                                        <button class="w-9 h-9 flex items-center justify-center rounded-full text-[#B5BAC1] hover:text-white transition-colors">
                                            <fa-icon [icon]="faComment" class="text-lg"></fa-icon>
                                        </button>
                                        <button class="w-9 h-9 flex items-center justify-center rounded-full text-[#B5BAC1] hover:text-white transition-colors">
                                            <fa-icon [icon]="faEllipsisV" class="text-lg"></fa-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div *ngIf="!individualFriends.length" class="h-full flex flex-col items-center justify-center text-center p-8">
                            <img src="/addFriend/friends.webp" alt="" class="w-[500px] mb-8">
                            <p class="text-[#949BA4] text-[16px] max-w-md">
                                No one's around to play with Wumpus.
                            </p>
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
            <!-- Active Now Sidebar -->
            <div class="w-[340px] bg-[#2B2D31] p-4 border-l border-[#1E1F22]">
                <h3 class="text-white font-semibold mb-4">Active Now</h3>
                <div class="flex flex-col items-center justify-center text-center mt-8">
                    <p class="text-white font-semibold mb-2">It's quiet for now...</p>
                    <p class="text-[#949BA4] text-[14px]">
                        When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!
                    </p>
                </div>
            </div>
        </section>
  `
})
export class AllFriendsComponent{
	faDiscord = faDiscord
	faEllipsisV = faEllipsisV
	faComment = faComment
	faSearch = faSearch

	individualFriends$
	individualFriendsLoading$
	individualFriendsError$

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	constructor(
		private store: Store
	) {
		this.individualFriends$ = this.store.select(selectGetIndividualFriendsResponse)
		this.individualFriendsLoading$ = this.store.select(selectGetIndividualFriendsLoading)
		this.individualFriendsError$ = this.store.select(selectGetIndividualFriendsError)

		this.currentAuthUser$ = this.store.select(selectUserProfile)
		this.currentAuthUserLoading$ = this.store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = this.store.select(selectUserProfileError)
	}

}
