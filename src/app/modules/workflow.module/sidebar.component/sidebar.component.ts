import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../general/services/shared.service';
import { JWTService } from '../../../general/services/jwt.service';

@Component({
 	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
 	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
	routes : any = [
		{
			name : 'my profile',
			route : 'profile',
			icon : 'fa-address-card-o'
		},
		{
			name : 'workflow',
			route : 'board',
			icon : 'fa-tasks'
		},
		{
			name : 'favorites',
			route : 'favorites',
			icon : 'fa-star-o'
		}
	]

	constructor(
				private router: Router,
                private sharedService : SharedService,
                private jwtService : JWTService) {}

    signOut() {
        this.jwtService.removeToken();
     	this.sharedService.setCurrentUser();
        this.router.navigate(['/login']);
    }
}
