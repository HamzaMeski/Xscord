import {Component, EventEmitter, Output} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@Component({
	standalone: true,
	selector: 'join-server-modal',
	imports: [
		FaIconComponent
	],
	template: `
        <section class="bg-[#313338] w-[440px] p-4 rounded-md">
            <!-- Close button -->
            <div class="flex justify-end mb-4">
                <fa-icon [icon]="faXmark" class="text-gray-400 hover:text-gray-200 cursor-pointer text-xl"></fa-icon>
            </div>

            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-white text-2xl font-bold mb-2">Join a Server</h1>
                <p class="text-gray-400 text-sm">Enter an invite below to join an existing server</p>
            </div>

            <!-- Invite Link Input -->
            <div class="mb-6">
                <label class="uppercase text-xs font-bold text-gray-300 mb-2 flex items-center">
                    INVITE LINK
                    <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                    type="text"
                    placeholder="https://discord.gg/hTKzmak"
                    class="w-full bg-[#1E1F22] text-gray-300 p-2.5 rounded-[3px] border-none focus:outline-none"
                >
            </div>

            <!-- Examples Section -->
            <div class="mb-6">
                <div class="text-xs font-bold text-gray-300 uppercase mb-2">INVITES SHOULD LOOK LIKE</div>
                <div class="text-gray-400 text-sm space-y-1">
                    <div>hTKzmak</div>
                    <div>https://discord.gg/hTKzmak</div>
                    <div>https://discord.gg/wumpus-friends</div>
                </div>
            </div>

            <!-- Don't have an invite section -->
            <div class="bg-[#1E1F22] rounded-md p-3 mb-6 cursor-pointer hover:bg-[#2B2D31] flex items-center">
                <div class="bg-[#23A559] p-2 rounded-full mr-3">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <div class="text-white font-medium">Don't have an invite?</div>
                    <div class="text-gray-400 text-sm">Check out Discoverable communities in Server Discovery.</div>
                </div>
                <div class="ml-auto text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-between">
                <button (click)="back()" class="px-4 py-2 text-white hover:underline cursor-pointer">Back</button>
                <button  class="px-4 py-2 bg-[#5865F2] text-white rounded-[3px] hover:bg-[#4752C4] cursor-pointer">Join Server</button>
            </div>
        </section>
	`
})
export class JoinServerComponent {
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