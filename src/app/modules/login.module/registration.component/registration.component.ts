import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import {MdSnackBar} from '@angular/material';
import { User } from '../../../general/models/User';
import {MdDialog} from '@angular/material';

@Component({
 	selector: 'registration',
	templateUrl: './registration.component.html',
 	styleUrls: ['../../../general/styles/authorization.css', './registration.component.css']
})
export class RegistrationComponent {
    user : User = {
        name : '',
        password : '',
        repeatedPassword : ''
    };
   
  	constructor(private httpWrapperService: HttpWrapperService,
                 private sharedService : SharedService,
                 private dialog : MdDialog,
                 private snackBar : MdSnackBar) {
  	}

  	signUpResponseHandler(response, error) : void {
        this.sharedService.toogleLoading();
        const message = (error) ? error : "Hello, let's sign in";
        this.snackBar.open(message, 'close', {
            duration: 2000,
        });
        if(!error){
             this.dialog.closeAll();
        }
  	}

  	signUp(user : User) : void {
        this.sharedService.toogleLoading();
  		this.httpWrapperService.sendRequest({
  			route : 'signUp',
  			callback : this.signUpResponseHandler.bind(this),
  			body : user
  		});
  	}

    comparePasswords(user : User){
        return (user.password === user.repeatedPassword);
    }

    onSubmit(validated : boolean) {
        if(validated) {
            if(!this.comparePasswords(this.user)){
                return  this.snackBar.open('Passwords must be equal', 'close', {
                    duration: 2000,
                });
            }
            this.signUp(this.user);
        }
    }
}
