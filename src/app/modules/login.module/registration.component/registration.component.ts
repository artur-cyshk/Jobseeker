import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { SharedService } from '../../../general/services/shared.service';
import {MdSnackBar} from '@angular/material';
import { User } from '../../../general/models/User';

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
                private snackBar : MdSnackBar) {
  	}

  	signUpResponseHandler(response, error) : void {
        this.sharedService.toogleLoading();
        const message = (error) ? error : 'Welcome on board';
        this.snackBar.open(message, 'close', {
            duration: 2000,
        });
  	}

  	signUp(user : User) : void {
        this.sharedService.toogleLoading();
  		this.httpWrapperService.sendRequest({
  			route : 'signUp',
  			callback : this.signUpResponseHandler.bind(this),
  			body : user
  		});
  	}

    comparePasswords(form : any){
        if(form.value.password !== form.value.repeatedPassword){
           console.log(form);
        }
    }

    onSubmit(validated : boolean) {
        if(validated) {
            this.signUp(this.user);
        }
    }
}
