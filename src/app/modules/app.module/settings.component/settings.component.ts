import { Component, trigger, transition, style, animate } from '@angular/core';   

@Component({
 	selector: 'settings',
	templateUrl: './settings.component.html',
	animations: [
	trigger(
		'enterAnimation', [
			transition(':enter', [
			  style({transform: 'translateX(100%)'}),
			  animate('500ms', style({transform: 'translateX(0)'}))
			]),
			transition(':leave', [
			  style({transform: 'translateX(0)'}),
			  animate('500ms', style({transform: 'translateX(100%)'}))
			])
		]
	)
	],
 	styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
}
