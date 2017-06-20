import { Component } from '@angular/core';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'board',
	templateUrl: './board.component.html',
 	styleUrls: ['./board.component.css']
})
export class BoardComponent {
	isOpenedStatusPanel : boolean = false;
	columns : Array<any>;
	formData : any = {
		languages : [],
		skills : []
	}
	options = {
		animation: 200,
		handle: ".fa-arrows-h",
		onUpdate: (event: any) => {
      		console.log(this.columns);
    	} 
	}

	constructor(private localStorageWrapperService : LocalStorageWrapperService, private httpWrapperService : HttpWrapperService) {
		this.columns = this.getColumns() || [];
		console.log(this.columns);
		this.getAllLanguages();
		this.getAllSkills();
	}

	getColumns() {
		return this.localStorageWrapperService.getItem('columns');
	}

	setColumns(columns) {
		this.localStorageWrapperService.setItem('columns', columns);
	}

	setColumn(columnInfo) {
		this.columns = this.columns.map( (item) => (item.title === columnInfo.title) ? columnInfo : item );
		this.setColumns(this.columns);
	}

	removeColumn(title) {
		let index = this.columns.findIndex( (item) => item.title === title );
		this.columns.splice(index, 1);
		this.setColumns(this.columns);		
	}

	addColumn(title) {
		if(!title) {
			return;
		}
		let index = 0;
		let counter = this.columns.filter( (item) => item.title.indexOf(title) == 0 ).length;
		this.columns.push({
			title : `${title}${counter ? 'copy' + counter : ''}`,
			filters : {
				skills : [],
				additionalSkills : [],
				languages : [],
				salary : 0,
				role : 'jobseeker',
				searchName : '',
				experience : 0
			},
			filtersVisible : false
		})
		this.setColumns(this.columns);
	}
	getSkillsResponseHandler(response, error) {
		if(!error) {
			this.formData.skills = response;			
		}
	}

	getLanguagesResponseHandler(response, error) {
		if(!error) {
			this.formData.languages = response;			
		}
	}

	getAllSkills() {
		this.httpWrapperService.sendRequest({
			route : 'getSkills',
			callback : this.getSkillsResponseHandler.bind(this)
		})
	}

	getAllLanguages() {
		this.httpWrapperService.sendRequest({
			route : 'getLanguages',
			callback : this.getLanguagesResponseHandler.bind(this)
		})
	}
}
