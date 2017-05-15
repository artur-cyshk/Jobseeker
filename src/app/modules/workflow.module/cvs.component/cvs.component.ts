import { Component } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'cvs',
	templateUrl: './cvs.component.html',
 	styleUrls: ['./cvs.component.css']
})
export class CvsComponent {
	constructor(private httpWrapperService : HttpWrapperService, private sharedService : SharedService) {}

}
