import { Component, Input } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';

@Component({
 	selector: 'profile',
	templateUrl: './profile.component.html',
 	styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

    currentUser : any;
    
    constructor( private sharedService : SharedService ) {
        this.currentUser = sharedService.getCurrentUser().subscribe( (result)=> this.setCurrentUser(result) );
    }	

    setCurrentUser(user){
        this.currentUser = user;
    }

    getProfileAvatar(name) {
        return `./assets/images/avatars/${name || 'empty.png'}`;
    }

}
