import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";


@Component({
	standalone: true,
	selector: 'prompt',
	imports: [
		CommonModule,
		FaIconComponent,
		FormsModule
	],
	template: `
        <section class="min-h-screen bg-[#2B2D31] text-white p-4 h-full flex flex-col">
	        <div class="flex justify-between pb-8">
                <div class="flex flex-col">
	                <strong class="text-2xl">Gemini</strong>
	                <span class="text-sm">2.0 Flash</span>
                </div>
                <div class="w-10 h-10 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                    <fa-icon [icon]="faDiscord" class="text-white text-xl"></fa-icon>
                </div>
	        </div>
            <!-- Message Container -->
            <div class="max-w-3xl mx-auto flex flex-col justify-between flex-1">
                <!-- Conversation Area -->
                <div class="overflow-y-auto space-y-2">
                    <!-- AI Message 2 -->
                    <div class="flex items-start gap-4">
                        <div class="w-15 h-15 rounded-full bg-[#5865F2] flex items-center justify-center">
                            <img src="/AI/gemini.png" alt="AI Avatar" class="w-[30px]">
                        </div>
                        <p class="flex-1 text-[#DCDDDE] p-4">
                            I’m sorry to hear that. Can you please provide your email address associated with the account?
                        </p>
                    </div>

                    <!-- User Message 2 -->
                    <div class="flex items-start gap-4">
                        <div class="w-15 h-15">
                        </div>
                        <div class="flex-1 flex justify-end ">
                            <p class="bg-zinc-900 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl p-4 text-[#DCDDDE]">It's use.com.</p>
                        </div>
                    </div>
                </div>
	            
	            

                <!-- Input Area -->
                <div class="flex items-center gap-2 bg-[#383A40] rounded-lg px-4 py-2.5">
                    <button class="text-[#B5BAC1] hover:text-white transition-colors">
                        <fa-icon [icon]="faCirclePlus" class="text-xl"></fa-icon>
                    </button>
                    <input type="text"
                           placeholder="Start messaging with gemini"
                           class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none">
                    <button class="px-4 py-1 bg-[#5865F2] text-white rounded hover:bg-[#4752C4] transition-colors">
                        Send
                    </button>
                </div>
            </div>

        </section>
	`
})
export class PromptComponent {
	faDiscord = faDiscord
	protected readonly faCirclePlus = faCirclePlus;
}