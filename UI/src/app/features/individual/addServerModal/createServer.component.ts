import {Component, EventEmitter, Output} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";

@Component({
	standalone: true,
	selector: 'create-server-modal',
	imports: [
		FaIconComponent,
		CommonModule,
	],
	template: `
        <section class="bg-[#313338] w-[440px] p-4 rounded-md">
            <div class="flex justify-end mb-4">
                <fa-icon [icon]="faXmark" class="text-gray-400 hover:text-gray-200 cursor-pointer text-xl"></fa-icon>
            </div>

            <div class="text-center mb-8">
                <h1 class="text-white text-2xl font-bold mb-2">Customise Your Server</h1>
                <p class="text-gray-400 text-sm">Give your new server a personality with a name and an icon. You can always change it later.</p>
            </div>

            <div class="flex justify-center mb-6">
                <div class="relative">
                    <div class="w-20 h-20 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer">
                        <div class="text-center">
                            <div class="text-gray-400">
                                <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3V6a3 3 0 00-3-3h-1.5M4 16l5-5m-5 5v-5m5 5h5m-5 0V6a3 3 0 013-3h7"></path>
                                </svg>
                            </div>
                            <div class="text-xs text-gray-400 mt-1">UPLOAD</div>
                        </div>
                    </div>
                    <!-- Plus icon -->
                    <div class="absolute bottom-0 right-0 bg-[#5865F2] rounded-full p-1 cursor-pointer">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <label class="uppercase text-xs font-bold text-gray-300 mb-2 block">SERVER NAME</label>
                <input type="text" value="hamza me ski's server" class="w-full bg-[#1E1F22] text-white p-2.5 rounded-[3px] border-none focus:outline-none">
            </div>

            <div class="text-xs text-gray-400 mb-4">
                By creating a server, you agree to Discord's
                <a href="#" class="text-[#00A8FC] hover:underline">Community Guidelines</a>.
            </div>

            <div class="flex justify-between">
                <button (click)="back()" class="px-4 py-2 text-white hover:underline cursor-pointer">Back</button>
                <button  class="px-4 py-2 bg-[#5865F2] text-white rounded-[3px] hover:bg-[#4752C4] cursor-pointer">Create</button>
            </div>
        </section>
	`
})
export class CreateServerComponent {
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


	back() {
		console.log('back')
		this.checker.emit({
			choiceModalChecker: true,
			createServerModalChecker: false,
			joinServerModalChecker: false
		})
	}
}