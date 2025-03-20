import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {ServerContainerModal} from "../addServerModal/serverContainerModal";
import {addPersonComponent} from "../server/addPerson/addPerson.component";


@Component({
	standalone: true,
	selector: 'profile',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink,
		CommonModule,
		ServerContainerModal,
		addPersonComponent,
	],
	template: `
	<div>profile</div>
	`
})
export class ProfileComponent {

}