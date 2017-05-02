import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import {MdDialog} from '@angular/material';
import { RegistrationComponent } from '../registration.component/registration.component';
import { JWTService } from '../../../general/services/jwt.service';

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
                private router : Router,
                private jwtService : JWTService,
                private dialog : MdDialog,
  	 			private localStorageWrapperService : LocalStorageWrapperService) {
  	}

  	loginResponseHandler(response, error) : void {
        if(error === null){
            this.navigateOnWorkflow();
            this.jwtService.setToken(response.token);
        }
  	}

    openSignUpDialog() {
        this.dialog.open(RegistrationComponent);
    }
    closeSignUpDialog() {
        this.dialog.closeAll();
    }      

    navigateOnWorkflow(){
         this.router.navigate(['/workflow']);
    }

  	login(user : User) : void {
  		this.httpWrapperService.sendRequest({
  			route : 'login',
  			callback : this.loginResponseHandler.bind(this),
  			body : user,
        isErrorDisplayingNeeded : true,
        successMessage : 'Welcome on board'
  		});
  	}

    onSubmit(validated : boolean) {
        if(validated) {
            this.login(this.user);
        }
    }
}
