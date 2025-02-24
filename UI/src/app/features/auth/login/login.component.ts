import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoginRequest} from "../../../core/types/auth/login.types";
import {login} from "../../../ngrx/actions/auth/login.actions";
import {selectLoginError, selectLoginLoading} from "../../../ngrx/selectors/auth/login.selectors";

@Component({
    standalone: true,
    selector: 'login',
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
                        <h1 class="text-3xl font-bold text-center">LOGIN</h1>

                        <div>
                            <div *ngIf="loading$ | async" class="text-lg">...</div>
                            <div *ngIf="error$ | async as error" class="text-red-500">{{ error }}</div>
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
                        <a routerLink="/auth/register">Create account account</a>
                        <br>
                        <a routerLink="/">Back home</a>
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
export class LoginComponent  {
    loading$: Observable<boolean>;
    error$: Observable<any>;

    myForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    constructor(private store: Store) {
        this.loading$ = this.store.select(selectLoginLoading)
        this.error$ = this.store.select(selectLoginError)
    }

    onSubmit() {
        if(this.myForm.valid) {
            const request: LoginRequest = this.myForm.value as LoginRequest
            console.log(request)
            this.store.dispatch(login({request}))
        }
    }
}
