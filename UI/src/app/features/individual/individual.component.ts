import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {loadUserProfile} from "../../ngrx/actions/userProfile/userProfile.actions";
import {Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {CommonModule} from "@angular/common";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../ngrx/selectors/userProfile/userProfile.selectors";
import {getIndividualServers} from "../../ngrx/actions/server/server.actions";
import {
	selectGetIndividualServersFailure,
	selectGetIndividualServersLoading,
	selectGetIndividualServersResponse
} from "../../ngrx/selectors/server/server.selectors";

@Component({
	standalone: true,
	selector: 'individual',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink,
		CommonModule
	],
	template: `
    <section
	    class="h-dvh  flex"
    >
		<!-- sidebar section -->
        <div class="flex flex-col items-center gap-2 p-2  w-20">
            <a
	            class="cursor-pointer w-16 h-16 bg-[#5865F2] rounded-3xl flex items-center justify-center"
	            routerLink="/individual/friend"
            >
	            <fa-icon [icon]="faDiscord" class="text-3xl"></fa-icon>
            </a>
	        
            <div class="w-6 h-2 bg-[#313338] rounded-3xl"></div>
	        
            <div *ngIf="individualServersLoading$ | async" class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center">...</div>
            <div *ngIf="!(individualServersLoading$ | async)">
                <div *ngIf="individualServers$ | async as servers" class="flex flex-col gap-2">
                    <a *ngFor="let server of servers" routerLink="/individual/server" class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center">
	                    {{ server.name[0] }}
                    </a>
                </div>
            </div>

	        <button class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center cursor-pointer">
		        <fa-icon [icon]="faPlus" class="text-2xl" ></fa-icon>
	        </button>
            <a routerLink="/individual/prompt" class="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
	            <img src="/AI/gpt.png" alt="" class="w-[93%]">
            </a>
        </div>
	    
	    <!-- friend/server section -->
	    <div class=" flex-1">
            <router-outlet></router-outlet>
	    </div>
    </section>
  `
})
export class IndividualComponent implements OnInit, OnDestroy {
	faDiscord = faDiscord
	faPlus = faPlus
	destroy$ = new Subject<void>()

	authUser$
	authUserLoading$
	authUserError$

	individualServers$
	individualServersLoading$
	individualServersError$

	constructor(
		private store: Store,
		private router: Router
	) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			filter((event: NavigationEnd)=> event.url === '/individual/friend'),
			takeUntil(this.destroy$)
		).subscribe(()=> {
			this.router.navigate(['/individual/friend/mng/allFriends'])
		})

		this.authUser$ = this.store.select(selectUserProfile)
		this.authUserLoading$ = store.select(selectUserProfileLoading)
		this.authUserError$ = store.select(selectUserProfileError)

		this.individualServers$ = this.store.select(selectGetIndividualServersResponse)
		this.individualServersLoading$ = this.store.select(selectGetIndividualServersLoading)
		this.individualServersError$ = this.store.select(selectGetIndividualServersFailure)
	}

	ngOnInit() {
		this.store.dispatch(loadUserProfile())
		this.store.dispatch(getIndividualServers())
	}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
