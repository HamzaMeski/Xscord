import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
	standalone: true,
	selector: 'friend',
	imports: [
		RouterLink,
	],
	template: `
    <section>
      friend
    </section>
  `
})
export class FriendComponent  {
}
