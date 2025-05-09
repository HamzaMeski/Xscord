import {Component, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectRegisterError, selectRegisterLoading} from "../../../ngrx/selectors/auth/register.selectors";
import {RegisterRequest} from "../../../core/types/auth/register.types";
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../ngrx/selectors/userProfile/userProfile.selectors";
import {update} from "../../../ngrx/actions/profile/profile.actions";


@Component({
	standalone: true,
	selector: 'profile',
	imports: [
		FontAwesomeModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	template: `
        <section class="flex bg-[#2B2D31] h-dvh">
            <div class="grow-6 self-center p-8 ">
                <div class="p-2  rounded-lg">
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="flex flex-col p-2 gap-8">

                        <div>
                            <div *ngIf="loading$ | async" class="text-lg">...</div>
                            <div *ngIf="error$ | async as error" class="text-red-500">{{ error }}</div>
                        </div>

                        <div class="flex flex-col">
                            <label for="" >first name:</label>
                            <input type="text" formControlName="firstName" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched">
                                <small *ngIf="myForm.get('firstName')?.errors?.['required']" class="text-red-500">first name is required</small>
                                <small *ngIf="myForm.get('firstName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label for="">last name:</label>
                            <input type="text" formControlName="lastName" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('lastName')?.invalid && myForm.get('lastName')?.touched">
                                <small *ngIf="myForm.get('lastName')?.errors?.['required']" class="text-red-500">last name is required</small>
                                <small *ngIf="myForm.get('lastName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label for="">email:</label>
                            <input type="text" formControlName="email" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched">
                                <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-500">Email is required</small>
                                <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-500">Set a valid email</small>
                            </div>
                        </div>
	                    

                        <div class="flex flex-col">
                            <label for="">display name:</label>
                            <input type="text" formControlName="displayName" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('displayName')?.invalid && myForm.get('displayName')?.touched">
                                <small *ngIf="myForm.get('displayName')?.errors?.['required']" class="text-red-500">display name is required</small>
                                <small *ngIf="myForm.get('displayName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label for="">phone:</label>
                            <input type="text" formControlName="phone" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('phone')?.invalid && myForm.get('phone')?.touched">
                                <small *ngIf="myForm.get('phone')?.errors?.['required']" class="text-red-500">phone is required</small>
                                <small *ngIf="myForm.get('phone')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label for="">bio:</label>
                            <textarea formControlName="bio" class="bg-gray-200 text-black p-1 rounded-md"></textarea>
                            <small>optional</small>
                        </div>


                        <button
                            type="submit"
                            class="rounded-md py-2 px-8 self-center "
                            [disabled]="myForm.invalid"
                            [ngClass]="myForm.invalid ? ' text-gray-600' : 'text-gray-100 cursor-pointer'"
                        >
                            submit
                        </button>

                    </form>
                </div>
            </div>
        </section>
	`
})
export class ProfileComponent implements OnInit {
	loading$: Observable<boolean>;
	error$: Observable<any>;

	authUser$
	authUserLoading$
	authUserError$
	userId!:number

	myForm = new FormGroup({
		firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
		bio: new FormControl('', []),
	});


	constructor(private store: Store) {
		this.loading$ = this.store.select(selectRegisterLoading)
		this.error$ = this.store.select(selectRegisterError)

		this.authUser$ = this.store.select(selectUserProfile)
		this.authUserLoading$ = this.store.select(selectUserProfileLoading)
		this.authUserError$ = this.store.select(selectUserProfileError)

	}

	onSubmit() {
		if(this.myForm.valid) {
			const request: RegisterRequest = this.myForm.value as RegisterRequest
			this.store.dispatch(update({request: request, userId: this.userId}))
		}
	}

	ngOnInit(): void {
		this.authUser$.subscribe(user => {
			if(user) {
				this.userId = user.id;
				this.myForm.patchValue({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					displayName: user.displayName,
					phone: user.phone,
					bio: user.bio,
				});
			}
		});
	}
}