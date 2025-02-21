import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'login',
  imports: [
    RouterLink
  ],
  template: `
    <section>
      <h1 class="text-3xl font-bold underline">  Login!</h1>
    </section>
    <a routerLink="/" class="text-sm">back home</a>
  `
})
export class LoginComponent  {



}
