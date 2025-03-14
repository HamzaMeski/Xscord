import {Component, OnInit} from "@angular/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faCirclePlus, faGear, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {
	selectServerGroupsFailure,
	selectServerGroupsLoading,
	selectServerGroupsResponse
} from "../../../ngrx/selectors/group/group.selectors";
import {getServerGroups} from "../../../ngrx/actions/group/group.actions";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
	standalone: true,
	selector: 'server',
	imports: [
		FaIconComponent,
		ReactiveFormsModule,
		RouterOutlet,
		CommonModule
	],
	template:`
        <section class="flex h-full w-full">
            <div class="w-60 flex flex-col h-full bg-[#2B2D31]">
				<div>
					hamza meski's server
				</div>
                <div class="flex items-center justify-between text-[15px]">
		            <p>TEXT CHANNELS</p>
                    <fa-icon [icon]="faCirclePlus" class="text-white cursor-pointer"></fa-icon>
                </div>
	            
	            <div *ngIf="serverGroups$ | async as groups">
                    <div *ngFor="let group of groups" class="flex items-center justify-between bg-gray-500 m-1">
                        <p># {{ group.name }} </p>
                        <div class="">
                            <fa-icon [icon]="faUserPlus" class="text-white cursor-pointer"></fa-icon>
                            <fa-icon [icon]="faGear" class="text-white pl-2 cursor-pointer"></fa-icon>
                        </div>
                    </div>
	            </div>
               
	            
                <!-- User Profile Bar -->
                <div class="mt-auto bg-[#232428] p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="relative">
                            <div class="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                                <fa-icon [icon]="faDiscord" class="text-white"></fa-icon>
                            </div>
                            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23A559] rounded-full border-2 border-[#232428]"></div>
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

	serverGroups$
	serverGroupsLoading$
	serverGroupsFailure$

	constructor(
		private route: ActivatedRoute,
		private store: Store
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


		this.serverGroups$.subscribe(val => console.log('GROUPS: ',val))
	}
}
