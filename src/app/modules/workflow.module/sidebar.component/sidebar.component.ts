import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../general/services/shared.service';
import { JWTService } from '../../../general/services/jwt.service';
import { GENERAL } from '../../../general/constants/general.constant';

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
			icon : 'fa-address-card-o',
			condition : () => true
		},
		{
			name : 'workflow',
			route : 'board',
			icon : 'fa-tasks',
			condition : () => true
		},
		{
			name : 'favorites',
			route : 'favorites',
			icon : 'fa-star-o',
			condition : () => true
		},
		{
			name : 'cvs',
			route : 'cvs',
			icon : 'fa-list-alt',
			condition : this.checkRole(0)
		},
		{
			name : 'vacancies',
			route : 'vacancies',
			icon : 'fa-list-alt',
			condition : this.checkRole(1)
		}
	]

	user : any;
	roles : any = GENERAL.roles;

	checkRole(roleIndex) {
		return () => {
			if(this.user) {
				return this.user.role === this.roles[roleIndex];
			}
		}
	}

	constructor(
				private router: Router,
                private sharedService : SharedService,
                private jwtService : JWTService) {
		sharedService.getCurrentUser().subscribe((user) => {
			this.user = user;
		})
	}

    signOut() {
        this.jwtService.removeToken();
     	this.sharedService.setCurrentUser();
        this.router.navigate(['/login']);
    }
}
