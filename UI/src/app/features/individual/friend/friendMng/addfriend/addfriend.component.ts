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
                    <button (click)="dispatch()" class="w-60 bg-blue-500 hover:bg-blue-400 p-2 rounded-md cursor-pointer text-[14px]">
                        Send Friend Request
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

	constructor(private store:Store) {
		this.authUser$ = this.store.select(selectUserProfile)

	}

	ngOnInit(): void {
		this.store.dispatch(loadUserProfile())
	}

	dispatch() {
		console.log('clicked')
		this.store.dispatch(friendShipDemand())
	}
}
