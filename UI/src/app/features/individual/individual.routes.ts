import {Routes} from "@angular/router";
import {IndividualComponent} from "./individual.component";
import {PromptComponent} from "./prompt/prompt.component";
import {ProfileComponent} from "./profile/profile.component";

export const individualRoutes: Routes = [
	{
		path: '',
		component: IndividualComponent,
		children: [
			{
				path: 'friend',
				loadChildren: () => import('./friend/friend.routes')
					.then(res => res.friendRoutes)
			},
			{
				path: 'server/:serverId',
				loadChildren: () => import('./server/server.routes')
					.then(res => res.serverRoutes)
			},
			{
				path: 'prompt',
				component: PromptComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			}
		]
	},
]
