import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {connectToChat} from "./ngrx/actions/peerChat/peerChat.actions";
import {map, of} from "rxjs";

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    template: `
        <section class="bg-zinc-900 text-gray-100 max-h-dvh">
            <router-outlet></router-outlet>
        </section>
    `
})
export class AppComponent implements OnInit{

    constructor(
        private store: Store
    ) {}

    ngOnInit() {
      if(localStorage.getItem('authUserToken')) {
        this.store.dispatch(connectToChat())
      }
    }
}
