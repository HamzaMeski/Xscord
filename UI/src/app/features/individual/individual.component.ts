import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

@Component({
	standalone: true,
	selector: 'individual',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink,
	],
	template: `
    <section
	    class="h-dvh  flex"
    >
		<!-- sidebar section -->
        <div class="flex flex-col items-center gap-2 p-2 bg-red-400 w-20">
            <a
	            class="cursor-pointer w-16 h-16 bg-blue-400 rounded-3xl flex items-center justify-center"
	            routerLink="/individual/friend"
            >
	            <fa-icon [icon]="faDiscord" class="text-3xl"></fa-icon>
            </a>
	        
            <div class="w-6 h-2 bg-gray-900 rounded-3xl"></div>
	        
            <a routerLink="/individual/server" class="cursor-pointer w-16 h-16 bg-gray-800 rounded-full"></a>
            <div class="w-16 h-16 bg-gray-800 rounded-full"></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full"></div>
        </div>
	    
	    <!-- friend/server section -->
	    <div class="bg-green-400 flex-1">
            <router-outlet></router-outlet>
	    </div>
    </section>
  `
})
export class IndividualComponent  {
	faDiscord = faDiscord
}
