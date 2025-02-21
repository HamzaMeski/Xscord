import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'guest-page',
  imports: [
    RouterLink
  ],
  template: `
    <section>
      <h1 class="text-3xl font-bold underline">  Guest Page!</h1>
      <nav class="flex gap-2">
        <a routerLink="/auth/login" class="bg-red-500">Login</a>
        <a routerLink="/auth/register" class="bg-green-500">Create account</a>
      </nav>
    </section>
  `
})
export class GuestPageComponent  {
}
