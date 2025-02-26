import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'friend-chat',
	imports: [
		RouterLink,
	],
	template: `
	    <section class="flex ">
		    FriendChat
	    </section>
  `
})
export class FriendChatComponent  {
}
