import {ApplicationConfig, provideZoneChangeDetection, isDevMode, inject} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {registerReducers} from "./ngrx/reducers/auth/register.reducers";
import {RegisterEffects} from "./ngrx/effects/auth/register.effects";
import {HttpHandlerFn, provideHttpClient, withInterceptors} from "@angular/common/http";
import {loginReducers} from "./ngrx/reducers/auth/login.reducers";
import {LoginEffects} from "./ngrx/effects/auth/login.effects";
import {userProfileReducers} from "./ngrx/reducers/userProfile/userProfile.reducers";
import {UserProfileEffects} from "./ngrx/effects/userProfile/userProfile.effects";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {FriendsEffects} from "./ngrx/effects/friends/friends.effects";
import {
    acceptFriendShipReqReducers,
    friendShipDemandReducers,
    getIndividualFriendsReducers,
    ignoreFriendShipReqReducers,
    loadSelectedFriendReducers,
    pendingRequestsReducers
} from "./ngrx/reducers/friends/friends.reducers";
import {
    peerChatConnectionReducers,
    peerChatHistoryReducers
} from "./ngrx/reducers/peerChat/peerChat.reducers";
import {PeerChatEffects} from "./ngrx/effects/peerChat/peerChat.effects";
import {
    createServerReducers,
    getIndividualServersReducers,
    getServerReducers
} from "./ngrx/reducers/server/server.reducers";
import {ServerEffects} from "./ngrx/effects/server/server.effects";
import {getGroupReducer, getServerGroupsReducers} from "./ngrx/reducers/group/group.reducers";
import {GroupEffects} from "./ngrx/effects/group/group.effects";
import {
    acceptServerInvitationReducer,
    getMemberJoinedServersReducer,
    getReceiverInvitationsReducer,
    getServerMembersReducer,
    sendServerInvitationReducer
} from "./ngrx/reducers/server/serverInvitation.reducers";
import {ServerInvitationEffects} from "./ngrx/effects/server/serverInvitation.effects";
import {openAddPersonReducers} from "./ngrx/reducers/modal/addPerson.reducers";
import {groupMessagesReducer} from "./ngrx/reducers/groupChat/groupChat.reducers";
import {GroupChatEffects} from "./ngrx/effects/groupChat/groupChat.effects";
import {updateReducer} from "./ngrx/reducers/profile/profile.reducers";
import {UpdateProfileEffects} from "./ngrx/effects/profile/profile.effects";


export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                (req, next: HttpHandlerFn)=>
                    inject(AuthInterceptor).intercept(req, { handle: next}
                )
            ])
        ),
        provideStore({
            register: registerReducers,
            login: loginReducers,
            userProfile: userProfileReducers,
            friendShipDemand: friendShipDemandReducers,
            pendingRequests: pendingRequestsReducers,
            acceptFriendShipReq: acceptFriendShipReqReducers,
            ignoreFriendShipReq: ignoreFriendShipReqReducers,
            getIndividualFriends: getIndividualFriendsReducers,
            loadSelectedFriend: loadSelectedFriendReducers,
            peerChatConnection: peerChatConnectionReducers,
            peerChatHistory:peerChatHistoryReducers,
            createServer: createServerReducers,
            getIndividualServers: getIndividualServersReducers,
            getServer: getServerReducers,
            getServerGroups: getServerGroupsReducers,
            sendServerInvitation: sendServerInvitationReducer,
            openAddPersonModal: openAddPersonReducers,
            getReceiverInvitations: getReceiverInvitationsReducer,
            acceptServerInvitation: acceptServerInvitationReducer,
            getServerMembers: getServerMembersReducer,
            getMemberJoinedServers: getMemberJoinedServersReducer,
            getGroupMessages: groupMessagesReducer,
            getGroup: getGroupReducer,
            updateProfile: updateReducer
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects([
            RegisterEffects,
            LoginEffects,
            UserProfileEffects,
            FriendsEffects,
            PeerChatEffects,
            ServerEffects,
            GroupEffects,
            ServerInvitationEffects,
            GroupChatEffects,
            UpdateProfileEffects
        ])
    ]
};
