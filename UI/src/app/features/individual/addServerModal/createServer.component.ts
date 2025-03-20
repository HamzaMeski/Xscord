import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectUserProfile} from "../../../ngrx/selectors/userProfile/userProfile.selectors";
import {IndividualResponse} from "../../../core/types/individual/individual.types";
import {createServer} from "../../../ngrx/actions/server/server.actions";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServerRequest} from "../../../core/types/server/server.types";
import {
	selectCreateServerError,
	selectCreateServerLoading,
	selectCreateServerResponse
} from "../../../ngrx/selectors/server/server.selectors";

@Component({
	standalone: true,
	selector: 'create-server-modal',
	imports: [
		FaIconComponent,
		CommonModule,
		ReactiveFormsModule,
		AsyncPipe
	],
	template: `
        <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="bg-[#313338] w-[440px] p-4 rounded-md">
            <div (click)="closeModal()" class="flex justify-end mb-4">
                <fa-icon [icon]="faXmark" class="text-gray-400 hover:text-gray-200 cursor-pointer text-xl"></fa-icon>
            </div>

            <div class="text-center mb-8">
                <h1 class="text-white text-2xl font-bold mb-2">Customise Your Server</h1>
                <p class="text-gray-400 text-sm">Give your new server a personality with a name and an icon. You can
                    always change it later.</p>
            </div>

            <div class="flex justify-center mb-6">
                <div class="relative">
                    <div
                        class="w-20 h-20 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer">
                        <div class="text-center">
                            <div class="text-gray-400">
                                <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3V6a3 3 0 00-3-3h-1.5M4 16l5-5m-5 5v-5m5 5h5m-5 0V6a3 3 0 013-3h7"></path>
                                </svg>
                            </div>
                            <div class="text-xs text-gray-400 mt-1">UPLOAD</div>
                        </div>
                    </div>
                    <!-- Plus icon -->
                    <div class="absolute bottom-0 right-0 bg-[#5865F2] rounded-full p-1 cursor-pointer">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <label class="uppercase text-xs font-bold text-gray-300 mb-2 block">SERVER NAME</label>
                <input formControlName="name" type="text"
                       class="w-full bg-[#1E1F22] text-white p-2.5 rounded-[3px] border-none focus:outline-none">
                <div *ngIf="myForm.get('name')?.invalid && myForm.get('name')?.touched">
                    <small *ngIf="myForm.get('name')?.errors?.['required']" class="text-red-500">password is required</small>
                    <small *ngIf="myForm.get('name')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>

            <div class="text-xs text-gray-400 mb-4">
                By creating a server, you agree to Discord's
                <a href="#" class="text-[#00A8FC] hover:underline">Community Guidelines</a>.
            </div>

            <div class="flex justify-between">
                <button (click)="back()" class="px-4 py-2 text-white hover:underline cursor-pointer">Back</button>
                <button
                    [disabled]="myForm.invalid"
                    [ngClass]="myForm.invalid ? 'bg-blue-300 text-gray-600' : 'bg-[#5865F2] hover:bg-[#4752C4]'"
                    class="px-4 py-2 rounded-[3px] text-white cursor-pointer w-24"
                >
	                <div *ngIf="!(createServerLoading$ | async)">Create</div>
	                <div *ngIf="(createServerLoading$ | async)">...</div>
                </button>
            </div>
        </form>
	`
})
export class CreateServerComponent implements OnInit{
	faXmark = faXmark

	@Output() checker: EventEmitter<{
		choiceModalChecker: boolean,
		createServerModalChecker: boolean,
		joinServerModalChecker: boolean
	}> = new EventEmitter<{
		choiceModalChecker: boolean,
		createServerModalChecker: boolean,
		joinServerModalChecker: boolean
	}>()
	@Output() close = new EventEmitter<boolean>()

	createServerResponse$
	createServerLoading$
	createServerFailure$

	authUser$
	authUser!: IndividualResponse | null

	myForm!:any

	constructor(private store:Store) {
		this.authUser$ = this.store.select(selectUserProfile)
		this.authUser$.subscribe(value => this.authUser = value)

		this.createServerResponse$ = this.store.select(selectCreateServerResponse)
		this.createServerLoading$ = this.store.select(selectCreateServerLoading)
		this.createServerFailure$ = this.store.select(selectCreateServerError)

		this.createServerResponse$.subscribe(value => {
			if(value) this.closeModal()
		})
	}

	ngOnInit(): void {
		this.authUser$.subscribe(user=> {
			if(user) {
				this.myForm = new FormGroup({
					name: new FormControl(`${this.authUser?.firstName + ' ' + this.authUser?.lastName}'s server`, [Validators.required, Validators.minLength(5)])
				})
			}
		})
	}

	back() {
		this.checker.emit({
			choiceModalChecker: true,
			createServerModalChecker: false,
			joinServerModalChecker: false
		})
	}
	closeModal() {
		this.close.emit(true)
	}

	onSubmit() {
		if(this.myForm.valid) {
			const request: ServerRequest = this.myForm.value as ServerRequest
			this.store.dispatch(createServer({request}))
		}
	}
}
