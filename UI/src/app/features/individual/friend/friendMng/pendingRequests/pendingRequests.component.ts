import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'pending-requests',
	imports: [
		RouterLink,
	],
	template: `
	    <section class="flex ">
		    pending requests
	    </section>
  `
})
export class PendingRequestsComponent {
}
