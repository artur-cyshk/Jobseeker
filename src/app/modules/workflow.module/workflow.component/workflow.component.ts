import { Component } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'workflow',
	templateUrl: './workflow.component.html',
 	styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent {
	constructor(private httpWrapperService : HttpWrapperService,private sharedService : SharedService){
		this.getCurrentUser();
	}

	currentUserResponseHandler(user, error) {
        if(user){
            this.sharedService.setCurrentUser(user);
        }
    }

    getCurrentUser() {
        this.httpWrapperService.sendRequest({
            route : 'getUser',
            callback : this.currentUserResponseHandler.bind(this)
        })
    }	
}
