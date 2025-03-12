import {Component, EventEmitter, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChoiceModalComponent} from "./choiceModal.component";
import {CreateServerComponent} from "./createServer.component";
import {JoinServerComponent} from "./joinServer.component";


@Component({
	standalone: true,
	selector: 'server-container-modal',
	imports: [
		CommonModule,
		ChoiceModalComponent,
		CreateServerComponent,
		JoinServerComponent,
	],
	template: `
		<section>
            <choice-modal *ngIf="choiceModalChecker" (checker)="updateCheckers($event)" (close)="handleCloseModal($event)"></choice-modal>
            <create-server-modal *ngIf="createServerModalChecker" (checker)="updateCheckers($event)" (close)="handleCloseModal($event)"></create-server-modal>
            <join-server-modal *ngIf="joinServerModalChecker" (checker)="updateCheckers($event)" (close)="handleCloseModal($event)"></join-server-modal>
		</section>
	`
})
export class ServerContainerModal{
	choiceModalChecker: boolean = true
	createServerModalChecker: boolean = false
	joinServerModalChecker: boolean = false

	updateCheckers(event: {
		choiceModalChecker: boolean,
		createServerModalChecker: boolean,
		joinServerModalChecker: boolean
	}){
		console.log('emitted at parent')
		this.choiceModalChecker = event.choiceModalChecker
		this.createServerModalChecker = event.createServerModalChecker
		this.joinServerModalChecker = event.joinServerModalChecker
	}


	@Output() close = new EventEmitter<boolean>()
	handleCloseModal(value: boolean) {
		this.close.emit(true)
	}
}