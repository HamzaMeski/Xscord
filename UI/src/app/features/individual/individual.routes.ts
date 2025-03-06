import {Routes} from "@angular/router";
import {ServerComponent} from "./server/server.component";
import {IndividualComponent} from "./individual.component";
import {PromptComponent} from "./prompt/prompt.component";


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
				path: 'server',
				component: ServerComponent
			},
			{
				path: 'prompt',
				component: PromptComponent
			}
		]
	},
]
