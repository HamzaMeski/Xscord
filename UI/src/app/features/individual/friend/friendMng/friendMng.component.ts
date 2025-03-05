import {Component, OnInit} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
	standalone: true,
	selector: 'friend-mng',
	imports: [
		RouterLink,
		RouterOutlet
	],
	template: `
	    <section class="flex flex-col h-full">
            <nav class="flex items-center gap-8 px-4 py-3 bg-[#313338] border-b border-[#1E1F22]">
                <a routerLink="/individual/friend/mng/onlineFriends"
                   class="text-[#949BA4] hover:text-white text-sm font-medium px-3 py-1 rounded transition-colors">
                    Online
                </a>
                <a routerLink="/individual/friend/mng/allFriends"
                   class="text-[#949BA4] hover:text-white text-sm font-medium px-3 py-1 rounded transition-colors">
                    All
                </a>
                <a routerLink="/individual/friend/mng/pendingRequests"
                   class="text-[#949BA4] hover:text-white text-sm font-medium px-3 py-1 rounded transition-colors">
                    Pending
                </a>
                <a routerLink="/individual/friend/mng/addFriend"
                   class="text-green-400 hover:text-green-500 text-sm font-medium px-3 py-1 rounded transition-colors">
                    Add Friend
                </a>
            </nav>
		    <main class="flex-1">
                <router-outlet></router-outlet>
		    </main>
	    </section>
  `
})
export class FriendMngComponent implements OnInit {

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.navigate(['/individual/friend/mng/allFriends'])
	}

}
