import { Component, Input } from '@angular/core';
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
}
