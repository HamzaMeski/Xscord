import { Routes } from '@angular/router';
import {GuestPageComponent} from "./features/guestPage/guestPage.component";

export const routes: Routes = [
	{
		path: '',
		component: GuestPageComponent
	},
	{
		path: 'auth',
		loadChildren: ()=> import('./features/auth/auth.routes')
			.then(res => res.authRoutes)
	}
];
