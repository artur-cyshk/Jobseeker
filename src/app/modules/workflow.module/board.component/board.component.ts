import { Component } from '@angular/core';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';

@Component({
 	selector: 'board',
	templateUrl: './board.component.html',
 	styleUrls: ['./board.component.css']
})
export class BoardComponent {
	isOpenedStatusPanel : boolean = false;
	columns : Array<any>;
	options = {
		animation: 200,
		handle: ".fa-arrows-h",
		onUpdate: (event: any) => {
      		console.log(this.columns);
    	} 
	}

	constructor(private localStorageWrapperService : LocalStorageWrapperService) {
		this.columns = this.getColumns() || [];
	}

	getColumns() {
		return this.localStorageWrapperService.getItem('columns');
	}

	setColumns() {
		this.localStorageWrapperService.setItem('columns', this.columns);
	}

	removeColumn(title) {
		let index = this.columns.findIndex( (item) => item.title === title );
		this.columns.splice(index, 1);
		this.setColumns();		
	}

	addColumn(title) {
		if(!title) {
			return;
		}
		let index = 0;
		let counter = this.columns.filter( (item) => item.title.indexOf(title) == 0 ).length;
		this.columns.push({
			title : `${title}${counter ? 'copy' + counter : ''}`
		})
		this.setColumns();
	}

}
