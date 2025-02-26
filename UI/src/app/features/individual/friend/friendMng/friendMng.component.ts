import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
	standalone: true,
	selector: 'friend-mng',
	imports: [
		RouterLink,
		RouterOutlet
	],
	template: `
	    <section class="flex flex-col bg-yellow-300 h-full">
		    <nav class="flex gap-12 bg-zinc-600 p-2">
                <a routerLink="/individual/friend/mng/onlineFriends" class="font-bold hover:bg-zinc-800 rounded-md px-2 py-1 font">Online</a>
                <a routerLink="/individual/friend/mng/allFriends" class="font-bold hover:bg-zinc-800 rounded-md px-2 py-1">All</a>
                <a routerLink="/individual/friend/mng/pendingRequests" class="font-bold hover:bg-zinc-800 rounded-md px-2 py-1">Pending</a>
                <a routerLink="/individual/friend/mng/addFriend" class="font-bold hover:bg-zinc-800 rounded-md px-2 py-1">Add Friend</a>
		    </nav>
		    <main>
			    <router-outlet></router-outlet>
		    </main>
	    </section>
  `
})
export class FriendMngComponent  {
}
