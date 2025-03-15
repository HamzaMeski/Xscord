import {Component, EventEmitter, Output} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faSearch, faSearchPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {closeAddPersonModal} from "../../../../ngrx/actions/modal/addPerson.actions";

@Component({
	standalone: true,
	selector: 'add-person',
	imports: [
		FaIconComponent
	],
	template: `
        <section class="bg-[#313338] w-[440px] p-4 rounded-md">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-white font-semibold">Invite friends to hamza me ski's server</h2>
                <button (click)="closeModal()" class="text-gray-400 hover:text-white cursor-pointer">
                    <fa-icon [icon]="faTimes"></fa-icon>
                </button>
            </div>

            <!-- Search Bar -->
            <div class="relative mb-4">
                <input type="text"
                       placeholder="Search for friends"
                       class="w-full bg-[#1E1F22] text-gray-200 px-3 py-2 rounded-md focus:outline-none">
                <fa-icon [icon]="faSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></fa-icon>
            </div>

            <!-- User List -->
            <div class="space-y-2 mb-6">
                <div class="flex items-center justify-between py-2">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 flex items-center justify-center bg-[#5865F2] rounded-full overflow-hidden flex-shrink-0">
                            <fa-icon [icon]="faDiscord" class="text-white text-sm"></fa-icon>
                        </div>
                        <span class="text-gray-200">Loussal Mohammed</span>
                    </div>
                    <button class="bg-[#248046] text-white px-4 py-1 text-sm rounded-md hover:bg-[#1a6334]">
                        Invite
                    </button>
                </div>
            </div>

            <!-- Invite Link Section -->
            <div class="mt-4 pt-4 border-t border-gray-700">
                <div class="text-gray-400 text-sm mb-2">OR SEND A SERVER INVITE LINK TO A FRIEND</div>
                <div class="flex gap-2">
                    <input type="text"
                           value="https://discord.gg/kXgkeyrr"
                           readonly
                           class="flex-1 bg-[#1E1F22] text-gray-200 px-3 py-2 rounded-md focus:outline-none">
                    <button class="bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4]">
                        Copy
                    </button>
                </div>
                <div class="text-gray-400 text-xs mt-2">
                    Your invite link expires in 7 days.
                    <a href="#" class="text-[#00A8FC] hover:underline">Edit invite link</a>
                </div>
            </div>
        </section>
	`
})
export class addPersonComponent {
	faDiscord = faDiscord
	faSearch = faSearch
	faTimes = faTimes

	constructor(private store: Store) {}

	closeModal() {
		this.store.dispatch(closeAddPersonModal())
	}
}
