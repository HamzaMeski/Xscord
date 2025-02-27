import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCancel, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {
	selectFriendShipDemandLoading, selectPendingRequestsError,
	selectPendingRequestsResponse
} from "../../../../../ngrx/selectors/friends/friends.selectors";
import {getPendingRequests} from "../../../../../ngrx/actions/friends/friends.actions";
import {CommonModule} from "@angular/common";

@Component({
	standalone: true,
	selector: 'pending-requests',
	imports: [
		RouterLink,
		FaIconComponent,
		CommonModule
	],
	template: `
        <section class="h-full flex bg-green-300">
	        <div class="flex-1 p-2 flex flex-col gap-4">
		        
		        <!--pending request-->
		        <div>
			        <div *ngIf="pendingRequests$ | async as pendingRequests">
                        <div *ngIf="pendingRequests.length" class="flex items-center justify-between gap-2 border-b-1 pb-1">
                            <div *ngFor="let request of pendingRequests" class="flex items-center gap-2">
                                <div class="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
                                    <fa-icon [icon]="faDiscord" class="text-2xl"></fa-icon>
                                </div>
                                <div>
                                    <div>
                                        {{ request.createdAt }}
                                    </div>
                                    <div class="flex gap-2">
                                        <p>{{ request.requester.firstName }}</p>
                                        <strong>{{ request.requester.displayName }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-2">
                                <fa-icon [icon]="faCheckCircle" class="text-2xl text-green-500 cursor-pointer"></fa-icon>
                                <fa-icon [icon]="faCancel" class="text-2xl text-red-500 cursor-pointer"></fa-icon>
                            </div>
                        </div>
				        <div *ngIf="!pendingRequests.length">
					        There is no pending requests for you this moment!
				        </div>
			        </div>
                </div>
	        </div>
            <div class="w-90 bg-zinc-500">
                Active Now
                <p></p>
            </div>
        </section>
  `
})
export class PendingRequestsComponent implements OnInit{
	protected readonly faDiscord = faDiscord
	protected readonly faCheckCircle = faCheckCircle;
	protected readonly faCancel = faCancel

	pendingRequests$
	pendingRequestsLoading$
	pendingRequestsError$

	constructor(
		private store: Store
	) {
		this.pendingRequests$ = store.select(selectPendingRequestsResponse)
		this.pendingRequestsLoading$ = store.select(selectFriendShipDemandLoading)
		this.pendingRequestsError$ = store.select(selectPendingRequestsError)
	}

	ngOnInit(): void {
		this.store.dispatch(getPendingRequests())
	}
}