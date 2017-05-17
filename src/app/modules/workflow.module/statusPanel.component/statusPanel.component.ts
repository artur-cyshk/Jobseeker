import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import { GENERAL } from '../../../general/constants/general.constant';

@Component({
 	selector: 'status-panel',
	templateUrl: './statusPanel.component.html',
 	styleUrls: ['./statusPanel.component.css']
})
export class StatusPanelComponent {
	@Input()
	isOpened : boolean;
	@Output()
	change: EventEmitter<any> = new EventEmitter();

	roles : Array<string>;
	currentUser : any;
	statuses : any = {
		cvs : [],
		vacancies : []
	};

	constructor(private httpWrapperService : HttpWrapperService, private sharedService : SharedService){
		this.getAllStatuses();
		this.roles = GENERAL.roles;
		this.sharedService.getCurrentUser().subscribe((result)=> this.currentUser = result)
	}

	getAllStatuses(){
		this.httpWrapperService.sendRequest({
			route : 'status',
			callback : (result, error) =>{
				if(!error && result && result.cvs && result.vacancies) {
					this.statuses.cvs = result.cvs;
					this.statuses.vacancies = result.vacancies;
				}
			}
		})
	}


	isOpenedChange() {
		this.change.emit();
	}
}
