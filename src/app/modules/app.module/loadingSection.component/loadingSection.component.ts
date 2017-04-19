import { Component, trigger, transition, style, animate } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
@Component({
 	selector: 'loading-section',
	templateUrl: './loadingSection.component.html',
 	styleUrls: ['./loadingSection.component.css'],
	animations: [
	trigger(
		'enterAnimation', [
			transition(':enter', [
			style({opacity: 0}),
			animate('0ms', style({opacity: 1}))
		]),
		transition(':leave', [
				style({opacity: 1}),
				animate('1500ms', style({opacity: 0}))
			])
		]
	)
	],
})
export class LoadingSectionComponent {
	nowIsLoading : boolean;
	constructor(private sharedService : SharedService){
		sharedService.getLoadingState().subscribe((result)=>{
			this.nowIsLoading = result;
		});
	}
}
