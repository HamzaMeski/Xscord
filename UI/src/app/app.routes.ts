import { Routes } from '@angular/router';
import {GuestPageComponent} from "./features/guestPage/guestPage.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";

export const routes: Routes = [
	{
		path: '',
		component: GuestPageComponent
	},
	{
		path: 'auth',
		loadChildren: ()=> import('./features/auth/auth.routes')
			.then(res => res.authRoutes)
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	}
];
