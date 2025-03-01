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
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
		</section>
	    <section *ngIf="!(currentAuthUserLoading$ | async) && !(selectedFriendLoading$ | async)" class="flex flex-col bg-blue-300 h-full">
            <div class="flex items-center gap-2 bg-zinc-600 p-2">
                <div class="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
                    <fa-icon [icon]="faDiscord"></fa-icon>
                </div>
                <strong>hamza me ski</strong>
            </div>
            <main class="flex h-full">
	            <div class="flex flex-col justify-between">
                    <div class="h-[800px] overflow-scroll p-4">
                        <div>
                            <div class="w-30 h-30 flex items-center justify-center bg-red-500 rounded-full">
                                <fa-icon [icon]="faDiscord" class="text-6xl"></fa-icon>
                            </div>
                            <strong class="font-bold text-4xl">Hamza meski</strong>
                            <p>this is the beginning of your direct message history with hamza meski</p>
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
                                <strong class="font-bold text-2xl">hamza meski</strong>
                                <div class="bg-gray-400 rounded-md p-2">
                                    <strong>about Me</strong>
                                    <p>
                                        23 yo Software Developer, Java, TS, I did my programming Studies at YOUCODE | UM6P school.
                                        Feel free to discuss with me any tech related topic.
                                        My Github: https://github.com/HamzaMeski
                                    </p>
                                    <strong>Member Since</strong>
                                    <p>17 Dec 2021</p>
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
