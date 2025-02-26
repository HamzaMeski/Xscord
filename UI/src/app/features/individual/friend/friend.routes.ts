import {Routes} from "@angular/router";
import {FriendMngComponent} from "./friendMng/friendMng.component";
import {FriendChatComponent} from "./friendChat/friendChat.component";
import {FriendComponent} from "./friend.component";


export const friendRoutes: Routes = [
	{
		path: '',
		component: FriendComponent,
		children: [
			{
				path: 'mng',
				component: FriendMngComponent
			},
			{
				path: 'chat',
				component: FriendChatComponent
			}
		]
	}
]
