import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

@Component({
	standalone: true,
	selector: 'friend-chat',
	imports: [
		RouterLink,
		RouterOutlet,
		FaIconComponent,
	],
	template: `
	    <section class="flex flex-col bg-blue-300 h-full">
            <div class="flex items-center gap-2 bg-zinc-600 p-2">
                <div class="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
                    <fa-icon [icon]="faDiscord"></fa-icon>
                </div>
                <strong>hamza meski</strong>
            </div>
            <main class="flex h-full">
	            <div class="p-4">
                    <div>
                        <div class="w-30 h-30 flex items-center justify-center bg-red-500 rounded-full">
                            <fa-icon [icon]="faDiscord" class="text-6xl"></fa-icon>
                        </div>
                        <strong class="font-bold text-4xl">Hamza meski</strong>
                        <p>this is the beginning of your direct message history with hamza meski</p>
                        <div class="flex gap-6">
                            <p>no servers in common</p>
                            <div>
                                <strong class="bg-zinc-600 rounded-md py-1 px-2 cursor-pointer">Remove Friend</strong>
                                <strong class="bg-zinc-600 rounded-md py-1 px-2 ml-2 cursor-pointer">Block</strong>
                            </div>
                        </div>
                    </div>
                    <div>
                        <!--message container-->
                        <div class="flex gap-2">
                            <div>
                                <div class="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
                                    <fa-icon [icon]="faDiscord" class="text-2xl"></fa-icon>
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <strong>hamza meski</strong>
                                    <p>23/02/2025, 13:20</p>
                                </div>
                                <p>
                                    Hello. hamza me ski I’m contacting the community members to see how their trading is going. Due to the market’s recent swings, I’ve been focusing on the Quantum Financing System (QFS) strategy on the blockchain Ledger. This low-risk management approach is designed for passive accumulation during predictable times. Have you had a chance to start your free demo trading yet?
                                </p>
                            </div>
                        </div>
                    </div>
	            </div>
	            <!--right side description-->
	            <div class="w-180 bg-green-300">
		            <div class="bg-black h-[200px]"></div>
		            <div class="flex flex-col justify-between bg-red-500 h-full">
			            <div>
                            <div class="bg-zinc-600 w-26 h-26 rounded-full"></div>
                            <strong class="font-bold text-2xl">hamza meski</strong>
                            <div class="bg-gray-400 rounded-md p-2">
                                <strong>about Me</strong>
                                <p>
                                    23 yo Software Developer, Java, TS, I did my programming Studies at YOUCODE | UM6P school.
                                    Feel free to discuss with me any tech related topic.
                                    My Github: https://github.com/HamzaMeski
                                </p>
                                <strong>Member Since</strong>
                                <p>17 Dec 2021</p>
                            </div>
			            </div>
			            <div>
				            view profile
			            </div>
		            </div>
	            </div>
            </main>
	    </section>
  `
})
export class FriendChatComponent  {
	protected readonly faDiscord = faDiscord;
}
