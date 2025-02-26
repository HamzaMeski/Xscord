import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'online-friends',
	imports: [
		RouterLink,
	],
	template: `
	    <section class="flex ">
		    online friends
	    </section>
  `
})
export class OnlineFriendsComponent {
}
