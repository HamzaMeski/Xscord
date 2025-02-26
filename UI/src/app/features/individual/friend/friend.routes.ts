import {Routes} from "@angular/router";
import {FriendChatComponent} from "./friendChat/friendChat.component";
import {FriendComponent} from "./friend.component";


export const friendRoutes: Routes = [
	{
		path: '',
		component: FriendComponent,
		children: [
			{
				path: 'mng',
				loadChildren: () => import('./friendMng/friendMng.routes')
					.then(res => res.friendMngRoutes)
			},
			{
				path: 'chat',
				component: FriendChatComponent
			}
		]
	}
]
