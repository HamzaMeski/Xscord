import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {Store} from "@ngrx/store";
import {
	selectGetIndividualFriendsError,
	selectGetIndividualFriendsLoading,
	selectGetIndividualFriendsResponse
} from "../../../../../ngrx/selectors/friends/friends.selectors";
import {getIndividualFriends} from "../../../../../ngrx/actions/friends/friends.actions";
import {
	selectUserProfile, selectUserProfileError,
	selectUserProfileLoading
} from "../../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {loadUserProfile} from "../../../../../ngrx/actions/userProfile/userProfile.actions";

@Component({
	standalone: true,
	selector: 'all-friends',
	imports: [
		RouterLink,
		AsyncPipe,
		FaIconComponent,
		NgForOf,
		NgIf,
	],
	template: `
        <section class="h-full flex bg-green-300">
            <div class="flex-1 p-2 flex flex-col gap-4 ">
                <!--loading data checker-->
                <div *ngIf="(individualFriendsLoading$ | async) || (currentAuthUserLoading$ | async)">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>

                <!--pending request-->
                <div *ngIf="!(individualFriendsLoading$ | async) && !(currentAuthUserLoading$ | async)">
                    <div *ngIf="individualFriends$ | async as individualFriends">
                        <div *ngIf="individualFriends.length" class="">
                            <div *ngFor="let friend of individualFriends" class="flex items-center justify-between gap-2 border-b-1 pb-1">
                                <div class="flex items-center gap-2">
                                    <div class="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
                                        <fa-icon [icon]="faDiscord" class="text-2xl"></fa-icon>
                                    </div>
                                    <div *ngIf="currentAuthUser$ | async as currentAuthUser">
                                        <div>
                                            {{ friend.createdAt }}
                                        </div>
	                                
                                    </div>
                                </div>

                                <div class="flex gap-2">
                                   ...
                                </div>
                            </div>
                        </div>
                        <div *ngIf="!individualFriends.length">
                            There is no pending requests for you this moment!
                        </div>
                    </div>
                    <div *ngIf="individualFriendsError$ | async" class="text-red-500">
                        Encounter trouble when trying to load data from SERVER
                    </div>
                    <div *ngIf="currentAuthUserError$ | async" class="text-red-500">
                        Encounter trouble when trying to load auth profile from SERVER
                    </div>
                </div>
            </div>
            <div class="w-90 bg-zinc-500">
                s sec
            </div>
        </section>
  `
})
export class AllFriendsComponent implements OnInit{
	protected readonly faDiscord = faDiscord;

	individualFriends$
	individualFriendsLoading$
	individualFriendsError$

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	constructor(
		private store: Store
	) {
		this.individualFriends$ = store.select(selectGetIndividualFriendsResponse)
		this.individualFriendsLoading$ = store.select(selectGetIndividualFriendsLoading)
		this.individualFriendsError$ = store.select(selectGetIndividualFriendsError)

		this.currentAuthUser$ = store.select(selectUserProfile)
		this.currentAuthUserLoading$ = store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = store.select(selectUserProfileError)
	}

	ngOnInit(): void {
		this.store.dispatch(loadUserProfile())
		this.store.dispatch(getIndividualFriends())
	}
}
