import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {ModelService} from "../../../core/services/restfull/external/model.service";
import {finalize} from "rxjs";
import {Store} from "@ngrx/store";
import {loadUserProfile} from "../../../ngrx/actions/userProfile/userProfile.actions";
import {selectUserProfile} from "../../../ngrx/selectors/userProfile/userProfile.selectors";


@Component({
	standalone: true,
	selector: 'external',
	imports: [
		CommonModule,
		FaIconComponent,
		FormsModule
	],
	template: `
        <section class="min-h-screen bg-[#2B2D31] text-white p-4 h-full flex flex-col">
	        <div class="flex justify-between pb-8">
                <div class="flex flex-col">
	                <strong class="text-2xl">OpenChat </strong>
	                <span class="text-sm">3.5 7B</span>
                </div>
                <div class="w-10 h-10 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                    <fa-icon [icon]="faDiscord" class="text-white text-xl"></fa-icon>
                </div>
	        </div>
            <!-- Message Container -->
            <div class="w-4xl mx-auto flex flex-col justify-between flex-1 min-h-0">
                <!-- Conversation Area -->
                <strong *ngIf="!messages.length" class="text-center mt-20 text-4xl font-bold">
                    Hello HAMZA MESKI!
                </strong>
	            
                <div #messagesContainer class="overflow-y-auto space-y-2 px-8">
	                <div  *ngFor="let message of messages ">
                        <!-- AI Message 2 -->
                        <div
                            *ngIf="!message.isUser"
                            class="flex items-start gap-4"
                        >
                            <div class="w-15 h-15 rounded-full bg-gray-200  flex items-center justify-center">
                                <img src="/AI/gpt.png" alt="" class="w-[93%]">
                            </div>
                            <p class="flex-1 text-[#DCDDDE] p-4">
                                {{message.content}}
                            </p>
                        </div>

                        <!-- User Message 2 -->
                        <div
                            *ngIf="message.isUser"
                            class="flex items-start gap-4"
                        >
                            <div class="w-15 h-15">
                            </div>
                            <div class="flex-1 flex justify-end ">
                                <p class="bg-zinc-900 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl p-4 text-[#DCDDDE]">
                                    {{message.content}}
                                </p>
                            </div>
                        </div>
	                </div>
                </div>
                

                <!-- Input Area -->
                <div class="flex items-center gap-2 bg-[#383A40] rounded-lg px-4 py-2.5">
                    <button class="text-[#B5BAC1] hover:text-white transition-colors">
                        <fa-icon [icon]="faCirclePlus" class="text-xl"></fa-icon>
                    </button>
                    <input
	                    (keyup.enter)="sendMessage()"
	                    type="text"
                        placeholder="Start messaging with gemini"
                        class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none"
                        [(ngModel)]="promptText"
                    >
                    <button
	                    (click)="sendMessage()"
	                    [ngClass]="(isLoading || !promptText.trim())? 'bg-blue-300' : 'bg-[#5865F2] hover:bg-[#4752C4]'"
	                    class="px-4 py-1  text-white rounded  transition-colors">
                        Send
                    </button>
                </div>
            </div>
        </section>
	`
})
export class PromptComponent implements OnInit, AfterViewChecked {
	faDiscord = faDiscord
	faCirclePlus = faCirclePlus

	messages: Array<{content: string, isUser: boolean}> = []
	promptText: string = ''
	isLoading = false

	@ViewChild('messagesContainer') private messagesContainer!: ElementRef

	scrollDown() {
		this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
	}

	constructor(
		private modelService : ModelService,
		private store: Store
	) {}

	sendMessage() {
		if(!this.promptText.trim() || this.isLoading) return

		const userPrompt = this.promptText
		this.promptText =''
		this.messages.push({
			content: userPrompt,
			isUser: true
		})
		this.modelService.generateResponse(userPrompt).pipe(
			finalize(() => {
				this.isLoading = false
			})
		).subscribe({
			next: (response) => {
				console.log(response)
				const aiResponse = response.choices[0].message.content
				this.messages.push({
					content: aiResponse,
					isUser: false
				})

			},
			error: (error) => {
				this.messages.push({
					content: `Sorry encounter an error try again: ${error}`,
					isUser: false
				})
			}
		})
	}

	ngOnInit() {
	}

	ngAfterViewChecked(): void {
		this.scrollDown()
	}
}