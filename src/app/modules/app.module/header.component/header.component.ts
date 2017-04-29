import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {JWTService} from '../../../general/services/jwt.service';
@Component({
 	selector: 'custom-header',
	templateUrl: './header.component.html',
 	styleUrls: ['./header.component.css']
})
export class HeaderComponent{
    @Input()
    currentUrl : string;
    @Input()
    currentUser : any;
    isAuthorizationChecked : boolean = false;
    constructor(private router: Router,
                private jwtService : JWTService) {}	


    signOut() {
        this.jwtService.removeToken();
        this.router.navigate(['/login']);
    }
}
