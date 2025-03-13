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
import {ServerContainerModal} from "./addServerModal/serverContainerModal";

@Component({
	standalone: true,
	selector: 'individual',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink,
		CommonModule,
		ServerContainerModal,

	],
	template: `
		<main class="relative">
            <section *ngIf="showServerModal"  class="absolute bg-black/70 top-0 bottom-0 left-0 right-0 z-1 flex items-center justify-center">
				<server-container-modal (close)="handleCloseModal($event)"></server-container-modal>
            </section>
            <section class="h-dvh flex">
                <!-- sidebar section -->
                <div class="flex flex-col items-center gap-2 p-2 w-20 overflow-auto">
                    <a
                        class="cursor-pointer w-14 h-14 shrink-0 bg-[#5865F2] rounded-3xl flex items-center justify-center"
                        routerLink="/individual/friend"
                    >
                        <fa-icon [icon]="faDiscord" class="text-3xl"></fa-icon>
                    </a>

                    <div class="w-6 h-2 bg-[#313338] rounded-3xl"></div>

                    <div *ngIf="individualServersLoading$ | async" class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center">...</div>
                    <div *ngIf="!(individualServersLoading$ | async)">
                        <div *ngIf="individualServers$ | async as servers" class="flex flex-col gap-2">
                            <a *ngFor="let server of servers" routerLink="/individual/server" class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center">
                                {{ server.name.substring(0,4) }}
                            </a>
                        </div>
                    </div>

                    <div class="relative">
                        <button (click)="showServerModal = true" class="w-14 h-14 bg-[#313338] rounded-full flex items-center justify-center cursor-pointer">
                            <fa-icon [icon]="faPlus" class="text-xl"></fa-icon>
                        </button>

                        <div *ngIf="false" class="absolute ml-full ml-6 mt-10 top-0 w-[200px] bg-[#313338] rounded-md p-2 text-white shadow-lg z-10">
                            <div class="py-2 px-3  cursor-pointer">Join a server</div>
                            <div class="py-2 px-3  rounded cursor-pointer">Create a server</div>
                        </div>
                    </div>

                    <a routerLink="/individual/prompt" class="w-14 h-14 shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                        <img src="/AI/gpt.png" alt="" class="w-[93%]">
                    </a>
                </div>

                <!-- friend/server section -->
                <div class=" flex-1">
                    <router-outlet></router-outlet>
                </div>
            </section>
		</main>
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

	showServerModal: boolean = false

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

	handleCloseModal(close: boolean) {
		if(close) this.showServerModal = false
		else this.showServerModal = true
	}
}
