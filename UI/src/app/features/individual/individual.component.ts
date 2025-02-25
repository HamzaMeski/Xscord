import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
	standalone: true,
	selector: 'individual',
	imports: [
		RouterLink,
	],
	template: `
    <section
	    class="h-dvh bg-amber-700 flex"
    >
        <div class="flex flex-col items-center gap-2 p-2 bg-red-400 w-20">
            <div class="w-16 h-16 bg-blue-400 rounded-3xl"></div>
            <div class="w-6 h-2 bg-gray-900 rounded-3xl"></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full"></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full"></div>
            <div class="w-16 h-16 bg-gray-800 rounded-full"></div>
        </div>
        <div class="bg-blue-400 flex-1">h</div>
    </section>
  `
})
export class IndividualComponent  {
}
