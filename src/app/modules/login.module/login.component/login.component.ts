import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'login',
	templateUrl: './login.component.html',
 	styleUrls: ['./login.component.css']
})
export class LoginComponent {
  	title = 'login';
  	constructor(private httpWrapperService: HttpWrapperService){
  		httpWrapperService.sendRequest('logout');
  	}
}
