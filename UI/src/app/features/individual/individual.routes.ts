import {Routes} from "@angular/router";
import {FriendComponent} from "./friend/friend.component";
import {ServerComponent} from "./server/server.component";
import {IndividualComponent} from "./individual.component";

export const individualRoutes: Routes = [
	{
		path: '',
		component: IndividualComponent
	},
	{
		path: 'friend',
		component: FriendComponent
	},
	{
		path: 'server',
		component: ServerComponent
	},
]