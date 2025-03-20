import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

@Component({
  standalone: true,
  selector: 'guest-page',
  imports: [
    RouterLink,
    FaIconComponent,
  ],
  template: `
    <section class="h-dvh">
      <nav class="flex justify-between items-center px-6 py-4">
        <div class="text-white font-bold text-xl">
          <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
            Discord
        </div>
        <div class="flex gap-4 items-center">
          <a routerLink="/auth/login" class="text-white hover:underline">Login</a>
          <a routerLink="/auth/register" class="bg-white text-black px-4 py-2 rounded-full hover:bg-opacity-90 transition-all">Create account</a>
        </div>
      </nav>
      <main class="h-[calc(100%-80px)] flex items-center px-6 max-w-7xl mx-auto">
        <div class="w-1/2 text-white pr-8">
          <h1 class="text-7xl font-bold leading-tight mb-6">
            GROUP CHAT THAT'S ALL FUN & GAMES
          </h1>
          <p class="text-xl leading-relaxed">
            Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
          </p>
        </div>
        <div class="w-1/2">
          <img src="landing/discord.webp" alt="Discord UI" class="w-full object-contain">
        </div>
      </main>
    </section>
  `
})
export class GuestPageComponent  {
  faDiscord = faDiscord
}
