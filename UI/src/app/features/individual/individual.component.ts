import {Component, OnInit} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {loadUserProfile} from "../../ngrx/actions/userProfile/userProfile.actions";
import {Store} from "@ngrx/store";
import {connectToChat} from "../../ngrx/actions/peerChat/peerChat.actions";

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
	            class="cursor-pointer w-16 h-16 bg-blue-400 rounded-3xl flex items-center justify-center"
	            routerLink="/individual/friend"
            >
	            <fa-icon [icon]="faDiscord" class="text-3xl"></fa-icon>
            </a>
	        
            <div class="w-6 h-2 bg-gray-900 rounded-3xl"></div>
	        
            <div routerLink="/individual/server" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center"><span>SE</span></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center"><span>A</span></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center"><span>B++</span></div>

        </div>
	    
	    <!-- friend/server section -->
	    <div class="bg-green-400 flex-1">
            <router-outlet></router-outlet>
	    </div>
    </section>
  `
})
export class IndividualComponent implements OnInit {
	faDiscord = faDiscord

	constructor(
		private store: Store
	) {}

	ngOnInit() {
		this.store.dispatch(loadUserProfile())
	}
}
