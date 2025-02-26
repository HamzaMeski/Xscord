import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'all-friends',
	imports: [
		RouterLink,
	],
	template: `
        <section class="h-full flex bg-green-300">
            <div class="flex-1">
                f sec
            </div>
            <div class="w-90 bg-zinc-500">
                s sec
            </div>
        </section>
  `
})
export class AllFriendsComponent {
}
