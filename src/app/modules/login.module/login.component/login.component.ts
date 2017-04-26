import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import {MdSnackBar} from '@angular/material';
import {MdDialog} from '@angular/material';
import { RegistrationComponent } from '../registration.component/registration.component';


import { User } from '../../../general/models/User';

@Component({
 	selector: 'login',
	templateUrl: './login.component.html',
 	styleUrls: ['../../../general/styles/authorization.css', './login.component.css']
})
export class LoginComponent {
    user : User = {
        name : '',
        password : ''
    };
    
  	constructor(private httpWrapperService: HttpWrapperService,
                private sharedService : SharedService,
                private snackBar : MdSnackBar,
                private router : Router,
                public dialog : MdDialog,
  	 			private localStorageWrapperService : LocalStorageWrapperService) {
  	}

  	loginResponseHandler(response, error) : void {
        this.sharedService.toogleLoading();
        const message = (error) ? error : 'Welcome on board';
        this.snackBar.open(message, 'close', {
            duration: 5000,
        });
        if(error === null){
            this.navigateOnWorkflow();
        }
  	}

    openSignUpDialog() {
        const dialog = this.dialog.open(RegistrationComponent);
    }
    closeSignUpDialog() {
        this.dialog.closeAll();
    }      

    navigateOnWorkflow(){
         this.router.navigate(['/workflow']);
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
