import {Routes} from "@angular/router";
import {ServerComponent} from "./server.component";
import {GroupChatComponent} from "./groupChat/groupChat.component";

export const serverRoutes: Routes = [
	{
		path: '',
		component: ServerComponent,
		children: [
			{
				path: 'chat/:groupId',
				component: GroupChatComponent
			}
		]
	}
]
