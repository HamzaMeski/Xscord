import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";

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
        <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-8 bg-purple-400 p-2">
            <h1 class="text-3xl font-bold underline">  Register!</h1>
            
            <div class="flex flex-col">
                <label for="">first name:</label>
                <input type="text" formControlName="firstName" class="bg-gray-100">
                <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched">
                    <small *ngIf="myForm.get('firstName')?.errors?.['required']" class="text-red-500">first name is required</small>
                    <small *ngIf="myForm.get('firstName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>
            
            <div class="flex flex-col">
                <label for="">last name:</label>
                <input type="text" formControlName="lastName" class="bg-gray-100">
                <div *ngIf="myForm.get('lastName')?.invalid && myForm.get('lastName')?.touched">
                    <small *ngIf="myForm.get('lastName')?.errors?.['required']" class="text-red-500">last name is required</small>
                    <small *ngIf="myForm.get('lastName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="">email:</label>
                <input type="text" formControlName="email" class="bg-gray-100">
                <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched">
                    <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-500">Email is required</small>
                    <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-500">Set a valid email</small>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="">password:</label>
                <input type="text" formControlName="password" class="bg-gray-100">
                <div *ngIf="myForm.get('password')?.invalid && myForm.get('password')?.touched">
                    <small *ngIf="myForm.get('password')?.errors?.['required']" class="text-red-500">password is required</small>
                    <small *ngIf="myForm.get('password')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="">display name:</label>
                <input type="text" formControlName="displayName" class="bg-gray-100">
                <div *ngIf="myForm.get('displayName')?.invalid && myForm.get('displayName')?.touched">
                    <small *ngIf="myForm.get('displayName')?.errors?.['required']" class="text-red-500">display name is required</small>
                    <small *ngIf="myForm.get('displayName')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>
            
            <div class="flex flex-col">
                <label for="">phone:</label>
                <input type="text" formControlName="phone" class="bg-gray-100">
                <div *ngIf="myForm.get('phone')?.invalid && myForm.get('phone')?.touched">
                    <small *ngIf="myForm.get('phone')?.errors?.['required']" class="text-red-500">phone is required</small>
                    <small *ngIf="myForm.get('phone')?.errors?.['minlength']" class="text-red-500">min length is 3</small>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="">bio:</label>
                <input type="text" formControlName="bio" class="bg-gray-100">
                <small>optional</small>
            </div>
            
            <button
                type="submit" class=""
                [disabled]="myForm.invalid"
                [ngClass]="myForm.invalid ? 'bg-green-300 text-gray-600' : 'bg-green-400 cursor-pointer'"
            >
                submit
            </button>
        </form>
        
        <div class="mt-20">
            <a routerLink="/auth/login">already have account</a>
            <br>
            <a routerLink="/" class="text-sm">back home</a>
        </div>
    `
})
export class RegisterComponent {

    myForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        bio: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })

    onSubmit() {
        if(this.myForm.valid) {
            console.log(this.myForm.value)
        }else {
            console.log('form invalid')
        }
    }
}
