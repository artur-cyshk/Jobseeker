import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';   
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import  { GENERAL } from '../../../general/constants/general.constant';

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
export class SettingsComponent implements OnInit{
	sizeSliderSetts : any;
	boardSettings : any = {};
	constructor(private localStorageWrapperService : LocalStorageWrapperService, private sharedService : SharedService) {}
	ngOnInit() {
		this.boardSettings = this.getBoardSetts() || GENERAL.defaultColumnSetts;
		this.initSizeSliderSetts(this.boardSettings);
	}

	getBoardSetts() {
		return this.localStorageWrapperService.getItem('boardSetts');
	}

	initSizeSliderSetts(boardSetts) {
		this.sizeSliderSetts = {
			max : GENERAL.sizeSliderSetts.max,
			min : GENERAL.sizeSliderSetts.min,
			step : GENERAL.sizeSliderSetts.step,
			label : GENERAL.sizeSliderSetts.label,
			value : boardSetts.columnWidth
		};
	}

	fieldChanged(event, field) {
		this.boardSettings[field] = event.value;
		this.localStorageWrapperService.setItem('boardSetts', this.boardSettings);
		this.setSharedBoardSettings(this.boardSettings);
	}

	setSharedBoardSettings(setts) {
		this.sharedService.setBoardSettings(setts);
	}
}
