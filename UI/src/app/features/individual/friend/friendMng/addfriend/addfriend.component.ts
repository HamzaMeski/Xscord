import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'add-friend',
	imports: [
		RouterLink,
	],
	template: `
	    <section class="flex ">
		    add friend
	    </section>
  `
})
export class AddfriendComponent  {
}
