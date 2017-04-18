import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import { User } from '../../../general/models/User';
@Component({
 	selector: 'login',
	templateUrl: './login.component.html',
 	styleUrls: ['./login.component.css']
})
export class LoginComponent {
  	constructor(private httpWrapperService: HttpWrapperService,
  	 			private localStorageWrapperService : LocalStorageWrapperService){
  	}

  	loginResponseHandler(response) : void {
  		console.log(response);
  	}

  	login(user : User) : void {
  		this.httpWrapperService.sendRequest({
  			route : 'login',
  			callback : this.loginResponseHandler,
  			body : user
  		});
  	}
}
