import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectUserProfile} from "../../../../../ngrx/selectors/userProfile/userProfile.selectors";
import {AsyncPipe, CommonModule} from "@angular/common";
import {friendShipDemand} from "../../../../../ngrx/actions/friends/friends.actions";
import {
	selectFriendShipDemandError,
	selectFriendShipDemandLoading
} from "../../../../../ngrx/selectors/friends/friends.selectors";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
	standalone: true,
	selector: 'add-friend',
	imports: [
		AsyncPipe,
		CommonModule,
		ReactiveFormsModule
	],
	template: `
        <section class="h-full flex bg-[#313338]">
            <div class="flex-1 p-6 flex flex-col">
                <!-- Header -->
                <h2 class="text-white text-[17px] font-semibold mb-2">ADD FRIEND</h2>
                <p class="text-[#949BA4] text-[14px] mb-4">You can add friends with their Discord usernames.</p>

                <!-- Form Section -->
                <div class="mb-8">
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="bg-[#1E1F22] flex p-3 rounded-lg">
                        <input
                            formControlName="individualId"
                            type="number"
                            placeholder="You can add friends with their Discord usernames"
                            class="bg-transparent border-none w-full text-[#DBDEE1] placeholder-[#949BA4] text-[16px] p-2 focus:ring-0 focus:outline-none"
                        >
                        <button
                            [disabled]="myForm.invalid"
                            [ngClass]="myForm.invalid ? 'bg-[#4752C4] opacity-50 cursor-not-allowed' : 'bg-[#5865F2] hover:bg-[#4752C4]'"
                            class="w-48 p-2 rounded text-white text-[14px] flex items-center justify-center transition-colors"
                            type="submit"
                        >
                            <div *ngIf="!(friendShipDemandLoading$ | async)">Send Friend Request</div>
                            <div *ngIf="friendShipDemandLoading$ | async" class="w-6 h-6">
                                <svg aria-hidden="true" class="w-5 h-5 text-[#1E1F22] animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                        </button>
                    </form>

                    <!-- Validation Messages -->
                    <div *ngIf="myForm.get('individualId')?.invalid && myForm.get('individualId')?.touched" class="mt-2">
                        <small *ngIf="myForm.get('individualId')?.errors?.['required']" class="text-red-500 text-[12px]">Individual ID is required</small>
                        <small *ngIf="myForm.get('individualId')?.errors?.['pattern']" class="text-red-500 text-[12px]">Individual ID should be a number</small>
                    </div>
                    <div *ngIf="friendShipDemandError$ | async as error" class="mt-2 text-red-500 text-[12px]">
                        Server validation error: {{error}}
                    </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-[#1E1F22] mb-8"></div>

                <!-- Wumpus Section -->
                <div class="flex flex-col items-center text-center">
                    <img src="/addFriend/friends.webp" alt="Wumpus" class="w-[500px] mb-8">
                    <p class="text-[#949BA4] text-[14px]">Wumpus is waiting on friends. You don't have to, though!</p>
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
export class AddfriendComponent {
	authUser$:Observable<any>
	friendShipDemandLoading$:Observable<any>
	friendShipDemandError$:Observable<any>

	myForm = new FormGroup({
		individualId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
	})

	constructor(private store:Store) {
		this.authUser$ = this.store.select(selectUserProfile)
		this.friendShipDemandLoading$ = this.store.select(selectFriendShipDemandLoading)
		this.friendShipDemandError$ = this.store.select(selectFriendShipDemandError)
	}

	onSubmit() {
		if(this.myForm.valid) {
			const receiverId: number  = Number(this.myForm.value.individualId)
			this.store.dispatch(friendShipDemand({receiverId}))
		}
	}
}
