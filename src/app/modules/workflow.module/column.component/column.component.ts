import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import  { GENERAL } from '../../../general/constants/general.constant';

@Component({
 	selector: 'column',
	templateUrl: './column.component.html',
 	styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnChanges{
	@Input()
	columnData : any;
	columnsSetts : any;
	columnFilterSetts : any;
	roles : any = [];
	@Input()
	filtersData : any = {
		languages : [],
		skills : []
	};
	columnValues : any = {
		cvs : [],
		vacancies : []
	}

	@Output()
	columnRemoved: EventEmitter<any> = new EventEmitter();
	@Output()
	columnFiltersChanged : EventEmitter<any> = new EventEmitter();

	constructor(private sharedService : SharedService,
				private localStorageWrapperService : LocalStorageWrapperService,
				private httpWrapperService : HttpWrapperService ) {
		this.sharedService.getBoardSettings().subscribe((setts) => {
			this.columnsSetts = localStorageWrapperService.getItem('boardSetts') || GENERAL.defaultColumnSetts;
		})
		this.columnFilterSetts = GENERAL.columnFilterSetts;
		this.roles = GENERAL.roles;
	}

	ngOnChanges(values) {
		if(values && values.columnData && values.columnData.currentValue) {
			this.getColumnItems(values.columnData.currentValue);
		}
	}

	removeColumn(title) {
		this.columnRemoved.emit(title);
	}

	filtersChanged(value, field) {
		if(this.columnData.filters[field] instanceof Array) {
			this.columnData.filters[field] = value;
		}else{
			this.columnData.filters[field] = value.value;
		}
		this.emitChanges();
	}

	emitChanges(){
		this.columnFiltersChanged.emit(this.columnData);
		this.getColumnItems(this.columnData);
	}

	getColumnItems(filter) {
		switch (filter.filters.role) {
			case 'employer':
				this.httpWrapperService.sendRequest({
					route:'filteredCvs',
					callback: this.getItemsCallback(filter.filters.role).bind(this),
					body: filter.filters
				});
				break;
			case 'jobseeker':
				this.httpWrapperService.sendRequest({
					route:'filteredVacancies',
					callback: this.getItemsCallback(filter.filters.role).bind(this),
					body: filter.filters
				});
				break;
		}
	}

	getItemsCallback(role) {
		return (items, err) => {
			if(!err) {
				this.columnValues[role === 'employer' ? 'cvs' : 'vacancies'] = items;
			}
		}
	}
}
