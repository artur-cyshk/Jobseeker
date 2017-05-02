import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../general/services/shared.service';
import { JWTService } from '../../../general/services/jwt.service';
import { ProfileSettingsComponent } from '../profileSettings.component/profileSettings.component';

@Component({
 	selector: 'profile-menu',
	templateUrl: './profileMenu.component.html',
 	styleUrls: ['./profileMenu.component.css']
})
export class ProfileMenuComponent{

    currentUser : any;
    
    constructor(private router: Router,
                private sharedService : SharedService,
                private jwtService : JWTService) {
        this.currentUser = sharedService.getCurrentUser().subscribe((result)=> this.setCurrentUser(result) );
    }	

    setCurrentUser(user){
        this.currentUser = user;
    }

    getProfileAvatar(name) {
        return `./assets/images/avatars/${name || 'empty.png'}`;
    }

    openProfileSettings(data) {
        //todo open
    }

    signOut() {
        this.jwtService.removeToken();
        this.router.navigate(['/login']);
    }
}
