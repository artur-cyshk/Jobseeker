import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

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
	
	statuses : any = {
		cvs : [],
		vacancies : []
	};

	constructor(private httpWrapperService : HttpWrapperService){
		this.getAllStatuses();
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
