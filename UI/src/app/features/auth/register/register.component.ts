import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectRegisterError, selectRegisterLoading} from "../../../ngrx/selectors/auth/register.selectors";
import {Observable} from "rxjs";
import {RegisterRequest} from "../../../core/types/auth/register.types";
import {register} from "../../../ngrx/actions/auth/register.actions";

@Component({
    standalone: true,
    selector: 'register',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgClass,
        CommonModule
    ],
    template: `
        <section class="flex h-dvh">
            <div class="grow-6 self-center p-8 ">
                <div class="p-2 border-1 rounded-lg">
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="flex flex-col p-2 gap-8">
                        <h1 class="text-3xl font-bold text-center">REGISTER</h1>

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
                            <label for="">password:</label>
                            <input type="password" formControlName="password" class="bg-gray-200 text-black p-1 rounded-md">
                            <div *ngIf="myForm.get('password')?.invalid && myForm.get('password')?.touched">
                                <small *ngIf="myForm.get('password')?.errors?.['required']" class="text-red-500">password is required</small>
                                <small *ngIf="myForm.get('password')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
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
                            [ngClass]="myForm.invalid ? 'bg-green-300 text-gray-600' : 'bg-green-400 cursor-pointer'"
                        >
                            submit
                        </button>
                      
                    </form>
                    <div class="underline">
                        <a routerLink="/auth/login">Already have account</a>
                        <br>
                        <a routerLink="/" >Back home</a>
                    </div>
                </div>  
            </div>
            
            <div
                [style.background-image]="'url(authImages/dark_road.jpg)'"
                [style.position]="'center'"
                class="bg-red-500 grow-4"
            >
            </div>
        </section>
        
    `
})
export class RegisterComponent {
    loading$: Observable<boolean>;
    error$: Observable<any>;

    myForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        bio: new FormControl('', []),
    })

    constructor(private store: Store) {
        this.loading$ = this.store.select(selectRegisterLoading)
        this.error$ = this.store.select(selectRegisterError)
    }

    onSubmit() {
        if(this.myForm.valid) {
            const request: RegisterRequest = this.myForm.value as RegisterRequest
            this.store.dispatch(register({request}))
        }
    }
}
