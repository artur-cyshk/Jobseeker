import { Component, Input } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import  { GENERAL } from '../../../general/constants/general.constant';

@Component({
 	selector: 'column',
	templateUrl: './column.component.html',
 	styleUrls: ['./column.component.css']
})
export class ColumnComponent {
	@Input()
	columnData : any;
	columnsSetts : number;
	constructor(private sharedService : SharedService, private localStorageWrapperService : LocalStorageWrapperService) {
		this.sharedService.getBoardSettings().subscribe((setts) => {
			this.columnsSetts = localStorageWrapperService.getItem('boardSetts') || GENERAL.defaultColumnSetts;
		})
	}
}
