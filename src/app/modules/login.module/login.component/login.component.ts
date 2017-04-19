import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import {MdSnackBar} from '@angular/material';

import { User } from '../../../general/models/User';

@Component({
 	selector: 'login',
	templateUrl: './login.component.html',
 	styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user : User = {
        name : '',
        password : ''
    };


    
  	constructor(private httpWrapperService: HttpWrapperService,
                private sharedService : SharedService,
                private snackBar : MdSnackBar,
  	 			private localStorageWrapperService : LocalStorageWrapperService) {
  	}

  	loginResponseHandler(response, error) : void {
        this.sharedService.toogleLoading();
        const message = (error) ? error : 'Welcome on board';
        this.snackBar.open(message, 'close', {
            duration: 0,
        });
  	}

  	login(user : User) : void {
        this.sharedService.toogleLoading();
  		this.httpWrapperService.sendRequest({
  			route : 'login',
  			callback : this.loginResponseHandler.bind(this),
  			body : user
  		});
  	}

    onSubmit(validated : boolean) {
        if(validated) {
            this.login(this.user);
        }
    }
}
