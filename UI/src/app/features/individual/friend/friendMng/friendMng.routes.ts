import {Routes} from "@angular/router";
import {FriendMngComponent} from "./friendMng.component";
import {AddfriendComponent} from "./addfriend/addfriend.component";
import {AllFriendsComponent} from "./allFriends/allFriends.component";
import {OnlineFriendsComponent} from "./onlineFriends/onlineFriends.component";
import {PendingRequestsComponent} from "./pendingRequests/pendingRequests.component";


export const friendMngRoutes: Routes = [
	{
		path: '',
		component: FriendMngComponent,
		children: [
			{
				path: 'addFriend',
				component: AddfriendComponent
			},
			{
				path: 'allFriends',
				component: AllFriendsComponent
			},
			{
				path: 'onlineFriends',
				component: OnlineFriendsComponent
			},
			{
				path: 'pendingRequests',
				component: PendingRequestsComponent
			}
		]
	}
]