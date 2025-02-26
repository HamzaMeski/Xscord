import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faUser, faUserGroup} from "@fortawesome/free-solid-svg-icons";


@Component({
	standalone: true,
	selector: 'friend',
	imports: [
		RouterLink,
		FontAwesomeModule,
		RouterOutlet
	],
	template: `
	    <section class="flex h-full w-full">
		    <div class="w-60 flex flex-col bg-purple-400 p-2">
                <a routerLink="/individual/friend/mng" class="cursor-pointer bg-zinc-700 flex items-center gap-2 px-2 py-8">
                    <fa-icon [icon]="faUser"></fa-icon>
                    <div>
                        friends
                    </div>
                </a>
                <a routerLink="/individual/friend/chat" class="cursor-pointer bg-blue-300 flex items-center gap-2 p-2 hover:bg-zinc-600">
                    <div class="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full">
	                    <fa-icon [icon]="faDiscord"></fa-icon>
                    </div>
	                <strong>hamza meski</strong>
                </a>
                <a  class="cursor-pointer bg-blue-300 flex items-center gap-2 p-2 hover:bg-zinc-600">
                    <div class="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full">
                        <fa-icon [icon]="faDiscord"></fa-icon>
                    </div>
                    <strong>med alg</strong>
                </a>
		    </div>
		    <div class="bg-red-300 flex-1">
			    <router-outlet></router-outlet>
		    </div>
	    </section>
  `
})
export class FriendComponent  {
	faDiscord = faDiscord
	faUser = faUser
}
