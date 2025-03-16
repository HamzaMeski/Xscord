import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {
	faCalendar,
	faChevronDown,
	faCirclePlus,
	faGear,
	faMicrophone,
	faUser,
	faUserPlus
} from "@fortawesome/free-solid-svg-icons";

import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {
	selectServerGroupsFailure,
	selectServerGroupsLoading,
	selectServerGroupsResponse
} from "../../../ngrx/selectors/group/group.selectors";
import {getServerGroups} from "../../../ngrx/actions/group/group.actions";
import {CommonModule} from "@angular/common";
import {openAddPersonModal} from "../../../ngrx/actions/modal/addPerson.actions";

@Component({
	standalone: true,
	selector: 'server',
	imports: [
		RouterLink,
		FaIconComponent,
		ReactiveFormsModule,
		RouterOutlet,
		CommonModule
	],
	template:`
        <section class="flex h-full w-full">
            <div class="w-60 flex flex-col h-full bg-[#2B2D31]">
                <!-- Server Name Header -->
                <div
                    class="h-12 px-4 flex items-center justify-between border-b border-[#1F2023] shadow-sm cursor-pointer hover:bg-[#35373C] transition-colors">
                    <span class="text-white font-medium truncate">hamza meski's server</span>
                    <fa-icon [icon]="faChevronDown" class="text-[#949BA4] text-xs"></fa-icon>
                </div>

                <!-- Text Channels Section -->
                <div class="px-2 mt-4 flex-1">
                    <div class="flex items-center justify-between px-2 mb-1 group">
                        <p class="text-xs font-semibold text-[#949BA4] uppercase tracking-wide">TEXT CHANNELS</p>
                        <fa-icon [icon]="faCirclePlus"
                                 class="text-[#949BA4] text-xs cursor-pointer opacity-0 group-hover:opacity-100 hover:text-[#DBDEE1] transition-all"></fa-icon>
                    </div>

                    <!-- Loading State -->
                    <div *ngIf="(serverGroupsLoading$ | async)" class="px-2 py-1 text-[#949BA4] text-sm">
                        Loading channels...
                    </div>

                    <!-- Channel List -->
                    <div *ngIf="!(serverGroupsLoading$ | async)">
                        <div *ngIf="serverGroups$ | async as groups">
                            <div *ngFor="let group of groups">
                                <a [routerLink]="['/individual/server', group.serverId,'chat', group.id]"
                                   class="flex items-center justify-between px-2 py-1.5 rounded group hover:bg-[#35373C] transition-colors cursor-pointer">
                                    <div class="flex items-center gap-1.5 text-[#949BA4] group-hover:text-[#DBDEE1]">
                                        <span class="text-lg">#</span>
                                        <span class="text-sm">{{ group.name }}</span>
                                    </div>
                                    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                        <fa-icon (click)="setShowAddPersonModalToTrue()"
                                                 [icon]="faUserPlus"
                                                 class="text-[#949BA4] hover:text-[#DBDEE1] text-xs cursor-pointer">
                                        </fa-icon>
                                        <fa-icon [icon]="faGear"
                                                 class="text-[#949BA4] hover:text-[#DBDEE1] text-xs cursor-pointer">
                                        </fa-icon>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
	                
                </div>

                <!-- User Profile Bar -->
                <div class="mt-auto bg-[#232428] p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="relative">
                            <div
                                class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
                            </div>
                            <div
                                class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23A559] rounded-full border-2 border-[#232428]"></div>
                        </div>
                        <span class="text-sm font-medium text-white">Hamza Meski</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="text-[#949BA4] hover:text-white transition-colors">
                            <fa-icon [icon]="faGear" class="w-4 h-4"></fa-icon>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <router-outlet></router-outlet>
            </div>
        </section>
  	`
})
export class ServerComponent implements OnInit{
	faDiscord = faDiscord
	faCirclePlus = faCirclePlus
	faGear = faGear
	faUserPlus = faUserPlus
	faChevronDown = faChevronDown

	serverGroups$
	serverGroupsLoading$
	serverGroupsFailure$

	constructor(
		private route: ActivatedRoute,
		private store: Store,
		private router: Router
	) {
		this.serverGroups$ = this.store.select(selectServerGroupsResponse)
		this.serverGroupsLoading$ = this.store.select(selectServerGroupsLoading)
		this.serverGroupsFailure$ = this.store.select(selectServerGroupsFailure)
	}

	ngOnInit(): void{
		this.route.params.subscribe(params => {
			const serverId = Number(params['serverId'])
			this.store.dispatch(getServerGroups({serverId}))
		})

		this.serverGroups$.subscribe(groups=> {
			if(groups){
				const firstGroup = groups[0]
				const serverId  = firstGroup.serverId
				const firstGroupId = firstGroup.id

				this.router.navigate([`/individual/server/${serverId}/chat/${firstGroupId}`])
			}
		})
	}

	setShowAddPersonModalToTrue() {
		this.store.dispatch(openAddPersonModal())
	}
}
