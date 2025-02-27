
/*
	send friend request
*/
import {createAction, props} from "@ngrx/store";
import {FriendShipDemandResponse} from "../../../core/types/friends /friends.types";

export const friendShipDemand = createAction(
	'[Friends] Send Friend Request',
	props<{receiverId: number}>()
)

export const friendShipDemandSuccess = createAction(
	'[Friends] Send Friend Request Success',
	props<{ response: FriendShipDemandResponse }>()
)

export const friendShipDemandFailure = createAction(
	'[Friends] Send Friend Request Failure',
	props<{ error: string }>()
)




/*
	accept friend request
*/




/*
	ignore friend request
*/





/*
	get all pending requests
*/

