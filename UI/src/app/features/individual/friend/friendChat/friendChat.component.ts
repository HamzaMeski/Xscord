import {Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadSelectedFriend} from "../../../../ngrx/actions/friends/friends.actions";
import {
	selectSelectedFriendError,
	selectSelectedFriendLoading,
	selectSelectedFriendResponse
} from "../../../../ngrx/selectors/friends/friends.selectors";
import {
	selectUserProfile, selectUserProfileError,
	selectUserProfileLoading
} from "../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {CommonModule} from "@angular/common";

@Component({
	standalone: true,
	selector: 'friend-chat',
	imports: [
		FaIconComponent,
		CommonModule
	],
	template: `
		<section *ngIf="(currentAuthUserLoading$ | async) || (selectedFriendLoading$ | async)" class="flex flex-col bg-blue-300 h-full">
            <div  class="flex flex-col bg-blue-300 h-full">
                <div class="flex items-center gap-2 bg-zinc-600 p-2">
                    <div class="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
                        <fa-icon [icon]="faDiscord"></fa-icon>
                    </div>
                    <strong>...</strong>
                </div>
                <main class="flex h-full">
                    <div class="flex flex-col justify-between">
                        <div class="h-[800px] overflow-scroll p-4">
                            <div>
                                <div class="w-30 h-30 flex items-center justify-center bg-red-500 rounded-full">
                                    <fa-icon [icon]="faDiscord" class="text-6xl"></fa-icon>
                                </div>
                                <strong class="font-bold text-4xl">...</strong>
                                <p>this is the beginning of your direct message history with ...</p>
                                <div class="flex gap-6">
                                    <p>no servers in common</p>
                                    <div>
                                        <strong class="bg-zinc-600 rounded-md py-1 px-2 cursor-pointer">Remove Friend</strong>
                                        <strong class="bg-zinc-600 rounded-md py-1 px-2 ml-2 cursor-pointer">Block</strong>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <!--message container-->
                            <div class="flex gap-2 mb-3">
                                <div>
                                    <div class="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
                                        <fa-icon [icon]="faDiscord" class="text-2xl"></fa-icon>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex">
                                        <strong>hamza meski</strong>
                                        <p>23/02/2025, 13:20</p>
                                    </div>
                                    <p>
                                        Hello. hamza me ski I’m contacting the community members to see how their trading is going. Due to the market’s recent swings, I’ve been focusing on the Quantum Financing System (QFS) strategy on the blockchain Ledger. This low-risk management approach is designed for passive accumulation during predictable times. Have you had a chance to start your free demo trading yet?
                                    </p>
                                </div>
                            </div>

                        </div>
                        <!--set message section-->
                        <div class="bg-gray-400 flex items-center pl-2">
                            <fa-icon [icon]="faCirclePlus" class="cursor-pointer"></fa-icon>
                            <input type="text" placeholder="Message hamza me ski" class="border-none w-full p-2 focus:ring-0 focus:outline-none">
                        </div>
                    </div>


                    <!--right side description-->
                    <div class="w-180 bg-green-300">
                        <div class="bg-black h-[200px]"></div>
                        <div class="flex flex-col justify-between bg-red-500 ">
                            <div class=" mt-[-20%] p-2">
                                <div>
                                    <div class="bg-zinc-600 w-26 h-26 rounded-full"></div>
                                    <strong class="font-bold text-2xl">...</strong>
                                    <div class="bg-gray-400 rounded-md p-2">
                                        <strong>about Me</strong>
                                        <p>
                                            ...
                                        </p>
                                        <strong>Member Since</strong>
                                        <p>...</p>
                                    </div>
                                </div>
                                <div>
                                    <button class="bg-zinc-600 rounded-md py-1 px-2 ml-2 cursor-pointer">
                                        view profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
		
		
	    <section *ngIf="!(currentAuthUserLoading$ | async) && !(selectedFriendLoading$ | async)" class="h-full">
		    <div *ngIf="selectedFriend$ | async as selectedFriend" class="flex flex-col bg-blue-300 h-full">
                <div class="flex items-center gap-2 bg-zinc-600 p-2">
                    <div class="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
                        <fa-icon [icon]="faDiscord"></fa-icon>
                    </div>
                    <strong>{{ selectedFriend.displayName }}</strong>
                </div>
                <main class="flex h-full">
                    <div class="flex flex-col justify-between">
                        <div class="h-[800px] overflow-scroll p-4">
                            <div>
                                <div class="w-30 h-30 flex items-center justify-center bg-red-500 rounded-full">
                                    <fa-icon [icon]="faDiscord" class="text-6xl"></fa-icon>
                                </div>
                                <strong class="font-bold text-4xl">{{ selectedFriend.displayName }}</strong>
                                <p>this is the beginning of your direct message history with {{ selectedFriend.displayName }}</p>
                                <div class="flex gap-6">
                                    <p>no servers in common</p>
                                    <div>
                                        <strong class="bg-zinc-600 rounded-md py-1 px-2 cursor-pointer">Remove Friend</strong>
                                        <strong class="bg-zinc-600 rounded-md py-1 px-2 ml-2 cursor-pointer">Block</strong>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <!--message container-->
                            <div class="flex gap-2 mb-3">
                                <div>
                                    <div class="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
                                        <fa-icon [icon]="faDiscord" class="text-2xl"></fa-icon>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex">
                                        <strong>hamza meski</strong>
                                        <p>23/02/2025, 13:20</p>
                                    </div>
                                    <p>
                                        Hello. hamza me ski I’m contacting the community members to see how their trading is going. Due to the market’s recent swings, I’ve been focusing on the Quantum Financing System (QFS) strategy on the blockchain Ledger. This low-risk management approach is designed for passive accumulation during predictable times. Have you had a chance to start your free demo trading yet?
                                    </p>
                                </div>
                            </div>

                        </div>
                        <!--set message section-->
                        <div class="bg-gray-400 flex items-center pl-2">
                            <fa-icon [icon]="faCirclePlus" class="cursor-pointer"></fa-icon>
                            <input type="text" placeholder="Message hamza me ski" class="border-none w-full p-2 focus:ring-0 focus:outline-none">
                        </div>
                    </div>


                    <!--right side description-->
                    <div class="w-180 bg-green-300">
                        <div class="bg-black h-[200px]"></div>
                        <div class="flex flex-col justify-between bg-red-500 ">
                            <div class=" mt-[-20%] p-2">
                                <div>
                                    <div class="bg-zinc-600 w-26 h-26 rounded-full"></div>
                                    <strong class="font-bold text-2xl">{{ selectedFriend.displayName }}</strong>
                                    <div class="bg-gray-400 rounded-md p-2">
                                        <strong>about Me</strong>
                                        <p>
                                            {{ selectedFriend.bio }}
                                        </p>
                                        <strong>Member Since</strong>
                                        <p>{{ selectedFriend.createdAt }}</p>
                                    </div>
                                </div>
                                <div>
                                    <button class="bg-zinc-600 rounded-md py-1 px-2 ml-2 cursor-pointer">
                                        view profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
		    </div>
          
	    </section>
  `
})
export class FriendChatComponent  implements OnInit{
	protected readonly faDiscord = faDiscord;
	protected readonly faCirclePlus = faCirclePlus;

	currentAuthUser$
	currentAuthUserLoading$
	currentAuthUserError$

	selectedFriend$
	selectedFriendLoading$
	selectedFriendError$

	constructor(
		private route: ActivatedRoute,
		private store: Store
	) {
		this.currentAuthUser$ = store.select(selectUserProfile)
		this.currentAuthUserLoading$ = store.select(selectUserProfileLoading)
		this.currentAuthUserError$ = store.select(selectUserProfileError)

		this.selectedFriend$ = this.store.select(selectSelectedFriendResponse)
		this.selectedFriendLoading$ = this.store.select(selectSelectedFriendLoading)
		this.selectedFriendError$ = this.store.select(selectSelectedFriendError)
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			console.log('params: ', params)
			const friendId = Number(params['friendId'])
			this.store.dispatch(loadSelectedFriend({friendId}))
		})
	}
}
