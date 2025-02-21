import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'register',
  imports: [
    RouterLink
  ],
  template: `
    <section>
      <h1 class="text-3xl font-bold underline">  Register!</h1>
      <a routerLink="/auth/login">already have account</a>
    </section>
    <a routerLink="/" class="text-sm">back home</a>
  `
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
    
  }

}
