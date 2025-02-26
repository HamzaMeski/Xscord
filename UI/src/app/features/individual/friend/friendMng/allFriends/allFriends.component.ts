import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'all-friends',
	imports: [
		RouterLink,
	],
	template: `
	    <section class="flex ">
		    all friends
	    </section>
  `
})
export class AllFriendsComponent {
}
