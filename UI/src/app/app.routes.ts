import { Routes } from '@angular/router';
import {GuestPageComponent} from "./features/guestPage/guestPage.component";
import {AuthGuard} from "./core/guards/canActivate/auth.guard";
import {ForbiddenComponent} from "./features/forbidden/forbidden.component";


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
		path: 'forbidden',
		component: ForbiddenComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'individual',
		loadChildren: () => import('./features/individual/individual.routes')
			.then(res => res.individualRoutes),
		canActivate: [AuthGuard]
	}
];
