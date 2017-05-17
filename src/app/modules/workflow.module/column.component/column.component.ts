import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import  { GENERAL } from '../../../general/constants/general.constant';

@Component({
 	selector: 'column',
	templateUrl: './column.component.html',
 	styleUrls: ['./column.component.css']
})
export class ColumnComponent{
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
		cvs : [
			{
				name : 'JS developer',
				description : 'front-end',
				userName : 'Artur',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'back-end',
				userName : 'Ilya',
				salary  : 3000,
				neededExperienceYears : 4,
				languages : ['English', 'Russian'],
				skills : ['Node.js'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				userName : 'Artem',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				userName : 'Stas',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				userName : 'Kristina',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			}
		],
		vacancies : [
			{
				name : 'JS developer',
				description : 'front-end',
				companyName : 'EPAM',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				companyName : 'EPAM',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				companyName : 'EPAM',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			},
			{
				name : 'JS developer',
				description : 'front-end',
				companyName : 'EPAM',
				salary  : 2000,
				neededExperienceYears : 3,
				languages : ['English', 'Russian'],
				skills : ['JS'],
				additionalSkills : ['AngularJs']
			}
		]
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
	}
}
