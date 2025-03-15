import {Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AsyncPipe, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {sendServerInvitation} from "../../../../ngrx/actions/server/serverInvitation.actions";
import {ServerJoinDemandRequest} from "../../../../core/types/server/serverJoinDemand.types";


@Component({
	standalone: true,
	selector: 'group-chat',
	imports: [
		FaIconComponent,
		AsyncPipe,
		NgIf,
		ReactiveFormsModule

	],
	template: `
    <section class="h-screen flex flex-col bg-[#313338]">
		  <div class="flex flex-col h-full">
		      <!-- Top Navigation Bar -->
		      <div class="flex items-center gap-2 bg-[#1E1F22] px-4 py-3 shadow-md flex-shrink-0">
		          <div>#</div>
		          <strong class="text-white font-medium">Chelling Group</strong>
		      </div>
		      
		      <main class="flex flex-1 min-h-0">
		          <!-- Main Chat Area -->
		          <div class="flex-1 flex flex-col min-h-0">
		              <!-- Chat Content -->
		              <div class="flex flex-col flex-1 min-h-0">
		                  <!-- Messages Container -->
		                  <div #messageContainer class="flex-1 overflow-y-auto">
		                      <div class="px-4 py-6">
		                          <!-- Welcome Message -->
			                      <div class="mb-8">
				                      INVITE YOUR FRIEND
			                      </div>
		                      </div>
		
		                      <!--Messages-->
		                      <div>
		
		                      </div>
		                  </div>
		
		                  <!-- Message Input -->
		                  <div class="px-4 py-4 flex-shrink-0 bg-[#313338] mt-auto">
		                      <div class="flex items-center gap-2 bg-[#383A40] rounded-lg px-4 py-2.5">
		                          <button class="text-[#B5BAC1] hover:text-white transition-colors">
		                              <fa-icon [icon]="faCirclePlus" class="text-xl"></fa-icon>
		                          </button>
		                          <input type="text"
		                                 class="flex-1 text-[#DBDEE1] placeholder-[#949BA4] focus:outline-none">
		                          <button 
		                                  class="px-4 py-1 bg-[#5865F2] text-white rounded hover:bg-[#4752C4] transition-colors">
		                              Send
		                          </button>
		                      </div>
		                  </div>
		              </div>
		          </div>

                  <!-- Right Sidebar -->
                  <div class="w-[340px] bg-[#2B2D31] border-l border-[#1F2023] flex-shrink-0">
                      <div class="h-[180px] bg-[#1E1F22]"></div>
                      <div class="flex flex-col px-4 -mt-16">
                          <div class="w-[120px] h-[120px] rounded-full border-8 border-[#2B2D31] overflow-hidden bg-[#5865F2] flex items-center justify-center mb-3">
                              <fa-icon [icon]="faDiscord" class="text-4xl text-white"></fa-icon>
                          </div>
                          <h2 class="text-xl font-bold text-white mb-4">testing</h2>

                          <!-- About Section -->
                          <div class="bg-[#232428] rounded-lg p-3 mb-4">
                              <h3 class="text-[#949BA4] font-medium mb-2">ABOUT ME</h3>
                              <p class="text-[#DBDEE1] text-sm">testin</p>
                          </div>

                          <!-- Member Since -->
                          <div class="bg-[#232428] rounded-lg p-3">
                              <h3 class="text-[#949BA4] font-medium mb-2">MEMBER SINCE</h3>
                              <p class="text-[#DBDEE1] text-sm">testing</p>
                          </div>

                          <!-- View Profile Button -->
                          <button class="mt-4 w-full px-4 py-2 bg-[#4E505C] text-white rounded hover:bg-[#6D6F7B] transition-colors">
                              View Profile
                          </button>
                      </div>
                  </div>
		      </main>
		  </div>
    </section>
  `
})
export class GroupChatComponent implements OnInit{
	faDiscord = faDiscord
	faCirclePlus = faCirclePlus

	constructor(
		private store: Store
	){}

	ngOnInit(): void {

	}
}
