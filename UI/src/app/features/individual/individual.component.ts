import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {loadUserProfile} from "../../ngrx/actions/userProfile/userProfile.actions";
import {Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
	standalone: true,
	selector: 'individual',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink,
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
	        
            <div class="w-6 h-2 bg-gray-900 rounded-3xl"></div>
	        
            <a routerLink="/individual/server" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">SE</a>
            <a class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">A</a>
            <a class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">B++</a>
            <a routerLink="/individual/prompt" class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
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
	destroy$ = new Subject<void>()

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
	}

	ngOnInit() {
		this.store.dispatch(loadUserProfile())
		// this.router.navigate(['individual/friend/mng/allFriends'])
	}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
