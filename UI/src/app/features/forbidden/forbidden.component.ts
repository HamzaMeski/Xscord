import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
	standalone: true,
	selector: 'forbidden',
	imports: [
		RouterLink,
		NgOptimizedImage
	],
	template: `
    <section>
      forbidden page 403
    </section>
  `
})
export class ForbiddenComponent  {
}
