import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectUserProfile} from "../../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {AsyncPipe, CommonModule} from "@angular/common";
import {loadUserProfile} from "../../../../../ngrx/actions/userProfile/userProfile.actions";
import {friendShipDemand} from "../../../../../ngrx/actions/friends/friends.actions";
import {
	selectFriendShipDemandError,
	selectFriendShipDemandLoading
} from "../../../../../ngrx/selectors/friends/friends.selectors";

@Component({
	standalone: true,
	selector: 'add-friend',
	imports: [
		RouterLink,
		FaIconComponent,
		AsyncPipe,
		CommonModule
	],
	template: `
	    <section class="h-full flex bg-green-300">
		    <div class="flex-1 p-2 flex flex-col gap-6">
                <p>ADD FRIEND</p>
                <p>You can add friends with their Discord usernames</p>
                <!--set message section-->
                <div class="bg-gray-400 flex p-2 rounded-md border-2 border-blue-400">
                    <input type="number" placeholder="You can add friends with their Discord usernames" class="border-none w-full p-2 focus:ring-0 focus:outline-none">
                    <button (click)="dispatch()" class="w-60 bg-blue-500 hover:bg-blue-400 p-2 rounded-md cursor-pointer text-[14px] flex items-center justify-center">
                        <div *ngIf="!(friendShipDemandLoading$ | async)" >Send Friend Request</div>
	                    <div *ngIf="friendShipDemandLoading$ | async" class="w-6 h-6 flex items-center justify-center">
                            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
	                    </div>
                    </button>
                </div>
			    <div class="border-1 border-zinc-600"></div>
		    </div>
		    <div class="w-90 bg-zinc-500">
			    Auth User Info
			    <p *ngIf="authUser$ | async as authUser">
                    current user email {{ authUser.email }}
                    current user displayName {{ authUser.displayName }}
			    </p>
		    </div>
	    </section>
  `
})
export class AddfriendComponent implements OnInit{
	protected readonly faCirclePlus = faCirclePlus;

	authUser$:Observable<any>
	friendShipDemandLoading$:Observable<any>
	friendShipDemandError$:Observable<any>

	constructor(private store:Store) {
		this.authUser$ = this.store.select(selectUserProfile)
		this.friendShipDemandLoading$ = this.store.select(selectFriendShipDemandLoading)
		this.friendShipDemandError$ = this.store.select(selectFriendShipDemandError)
	}

	ngOnInit(): void {
		this.store.dispatch(loadUserProfile())
	}

	dispatch() {
		console.log('clicked')
		this.store.dispatch(friendShipDemand())
	}
}
