import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadUserProfile} from "../../ngrx/actions/userProfile/userProfile.actions";


@Component({
	standalone: true,
	selector: 'dashboard',
	imports: [
		RouterLink
	],
	template: `
    <section>
      	<h1 class="text-3xl font-bold underline">  Dashboard!</h1>
	    <button class="cursor-pointer bg-green-400 m-2" (click)="loadUserProfile()">load user profile</button>
      	<nav class="flex gap-2">
        	<a routerLink="/" class="bg-red-500">back</a>
        </nav>
    </section>
  `
})
export class DashboardComponent  {

	constructor(
		private store: Store
	) {}

	loadUserProfile() {
		console.log('dispatching...')
		this.store.dispatch(loadUserProfile())
	}
}
