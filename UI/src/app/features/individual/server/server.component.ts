import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'server',
	imports: [
		RouterLink,
	],
	template: `
    <section>
      server
    </section>
  `
})
export class ServerComponent  {
}
