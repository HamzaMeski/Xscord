import {Component, EventEmitter, Output} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";


@Component({
	standalone: true,
	selector: 'choice-modal',
	imports: [
		CommonModule,
		FaIconComponent,
	],
	template: `
        <section class="bg-[#313338] w-[440px] p-4 rounded-md">
            <div (click)="closeModal()" class="flex justify-end mb-4">
                <fa-icon [icon]="faXmark" class="text-gray-400 hover:text-gray-200 cursor-pointer text-xl"></fa-icon>
            </div>

            <div class="text-center mb-6">
                <h1 class="text-white text-2xl font-bold mb-2">Create Your Server</h1>
                <p class="text-gray-400 text-sm">Your server is where you and your friends hang out. Make yours and start talking.</p>
            </div>

            <div (click)="createServer()" class="flex items-center p-3 bg-[#404249] hover:bg-[#35373C] rounded-md cursor-pointer mb-4">
                <div class="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                </div>
                <div class="text-white font-medium">Create My Own</div>
                <div class="ml-auto text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>

            <div class="mt-6 text-center">
                <h2 class="text-gray-400 text-sm mb-2">Already have an invite?</h2>
                <button (click)="joinServer()" class="w-full bg-[#404249] hover:bg-[#35373C] text-white py-2 rounded-md cursor-pointer">Join a Server</button>
            </div>
        </section>
	`
})
export class ChoiceModalComponent {
	faXmark = faXmark

	@Output() checker: EventEmitter<{
		choiceModalChecker: boolean,
		createServerModalChecker: boolean,
		joinServerModalChecker: boolean
	}> = new EventEmitter<{
		choiceModalChecker: boolean,
		createServerModalChecker: boolean,
		joinServerModalChecker: boolean
	}>()


	createServer() {
		this.checker.emit({
			choiceModalChecker: false,
			createServerModalChecker: true,
			joinServerModalChecker: false
		})
	}

	joinServer() {
		this.checker.emit({
			choiceModalChecker: false,
			createServerModalChecker: false,
			joinServerModalChecker: true
		})
	}


	@Output() close = new EventEmitter<boolean>()
	closeModal() {
		this.close.emit(true)
	}
}