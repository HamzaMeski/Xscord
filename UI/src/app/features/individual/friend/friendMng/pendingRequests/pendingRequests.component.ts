import {Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCancel, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {
	selectAcceptFriendShipReqError,
	selectAcceptFriendShipReqLoading,
	selectIgnoreFriendShipReqError,
	selectIgnoreFriendShipReqLoading,
	selectPendingRequestsError,
	selectPendingRequestsLoading,
	selectPendingRequestsResponse
} from "../../../../../ngrx/selectors/friends/friends.selectors";
import {
	acceptFriendShipReq,
	getPendingRequests,
	ignoreFriendShipReq
} from "../../../../../ngrx/actions/friends/friends.actions";
import {CommonModule} from "@angular/common";

@Component({
	standalone: true,
	selector: 'pending-requests',
	imports: [
		FaIconComponent,
		CommonModule
	],
	template: `
        <section class="h-full flex bg-[#313338]">
	        <div class="flex-1 gap-4">
		        <!--loading data checker-->
		        <div *ngIf="(pendingRequestsLoading$ | async)" class="h-full flex items-center justify-center">
			        
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
		        </div>
		        
		        <!--pending request-->
		        <div *ngIf="!(pendingRequestsLoading$ | async)" class=" h-full">
                    <div *ngIf="pendingRequests$ | async as pendingRequests" class="h-full bg-[#313338] p-4">
                        <!-- Has Pending Requests -->
                        <div *ngIf="pendingRequests.length" class="h-full">
                            <div *ngFor="let request of pendingRequests"
                                 class="flex items-center justify-between p-3 hover:bg-[#2E3035] rounded-lg mb-2 group transition-colors">
                                <!-- User Info -->
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 flex items-center justify-center bg-[#5865F2] rounded-full overflow-hidden flex-shrink-0">
                                        <fa-icon [icon]="faDiscord" class="text-lg text-white"></fa-icon>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <span class="font-semibold text-white">{{ request.requester.displayName }}</span>
                                            <span class="text-[#949BA4] text-sm">{{ request.requester.firstName }}</span>
                                        </div>
                                        <div class="text-[#949BA4] text-sm">
                                            Incoming Friend Request
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex items-center gap-3">
                                    <!-- Accept Button -->
                                    <button
	                                    (click)="acceptRequest(request.id)"
	                                    class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#2B2D31] text-[#23A559] transition-colors cursor-pointer">
                                        <fa-icon [icon]="faCheckCircle" class="text-xl"></fa-icon>
                                    </button>
                                 

                                    <!-- Ignore Button -->
                                    <button 
	                                    (click)="ignoreRequest(request.id)"
	                                    class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#2B2D31] text-[#ED4245] transition-colors cursor-pointer">
                                        <fa-icon [icon]="faCancel" class="text-xl"></fa-icon>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- No Pending Requests -->
                        <div *ngIf="!pendingRequests.length" class="h-full flex flex-col items-center justify-center text-center p-8">
                            <img src="/addFriend/friends.webp" alt="" class="w-[500px] mb-8">
                            <p class="text-[#949BA4] text-[16px] max-w-md">
                                There are no pending friend requests. Click "Add Friend" to send friend requests.
                            </p>
                        </div>
                    </div>
			        
			        <div *ngIf="pendingRequestsError$ | async" class="text-red-500">
				        Encounter trouble when trying to load data from SERVER
			        </div>
                    <div *ngIf="acceptPendingRequestError$ | async" class="text-red-500">
                        Encounter trouble when trying to accept request in the SERVER
                    </div>
                    <div *ngIf="ignorePendingRequestError$ | async" class="text-red-500">
                        Encounter trouble when trying to accept request in the SERVER
                    </div>
                </div>
	        </div>
            <!-- Active Now Sidebar -->
            <div class="w-[340px] bg-[#2B2D31] p-4 border-l border-[#1E1F22]">
                <h3 class="text-white font-semibold mb-4">Active Now</h3>
                <div class="flex flex-col items-center justify-center text-center mt-8">
                    <p class="text-white font-semibold mb-2">It's quiet for now...</p>
                    <p class="text-[#949BA4] text-[14px]">
                        When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!
                    </p>
                </div>
            </div>
        </section>
  `
})
export class PendingRequestsComponent implements OnInit{
	protected readonly faDiscord = faDiscord
	protected readonly faCheckCircle = faCheckCircle;
	protected readonly faCancel = faCancel

	// get pending requests
	pendingRequests$
	pendingRequestsLoading$
	pendingRequestsError$

	// accept pending request
	acceptPendingRequestLoading$
	acceptPendingRequestError$

	// ignore pending request
	ignorePendingRequestLoading$
	ignorePendingRequestError$



	constructor(
		private store: Store
	) {
		this.pendingRequests$ = store.select(selectPendingRequestsResponse)
		this.pendingRequestsLoading$ = store.select(selectPendingRequestsLoading)
		this.pendingRequestsError$ = store.select(selectPendingRequestsError)

		this.acceptPendingRequestLoading$ = store.select(selectAcceptFriendShipReqLoading)
		this.acceptPendingRequestError$ = store.select(selectAcceptFriendShipReqError)

		this.ignorePendingRequestLoading$ = store.select(selectIgnoreFriendShipReqLoading)
		this.ignorePendingRequestError$ = store.select(selectIgnoreFriendShipReqError)
	}

	ngOnInit(): void {
		this.store.dispatch(getPendingRequests())
	}

	acceptRequest(requestId: number): void {
		this.store.dispatch(acceptFriendShipReq({requestId}))
	}

	ignoreRequest(requestId: number): void {
		this.store.dispatch(ignoreFriendShipReq({requestId}))
	}
}