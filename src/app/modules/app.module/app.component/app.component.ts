import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Response } from '@angular/http';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
 	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    currentUrl : string;
    currentUser : any;
    constructor(private router: Router,
                private sharedService : SharedService,
    			private httpWrapperService : HttpWrapperService) {}	

    ngOnInit() {
  		this.router.events
		    .filter(event => event instanceof RoutesRecognized)
		    .subscribe(this.routeChangedHandler.bind(this));
    }

    routeChangedHandler(event : any) {
        const availableUrls = ['/login', '/workflow'];
        const isCurrentUrl = availableUrls.find( (url) => url == event.url );
        const isAfterRedirects = availableUrls.find( (url) => url == event.urlAfterRedirects );
        if( isCurrentUrl ||  isAfterRedirects) {
            this.checkUserAuthorization(isCurrentUrl || isAfterRedirects);
        }          
    }

    checkUserAuthorization(currentUrl : String) {
        this.httpWrapperService.sendRequest({
            route : 'authorized',
            callback : this.authorizedHandler.bind(this)
        });
    }

    authorizedHandler(response, error) {
        const navRoute = (error) ? '/login' : '/workflow';
        this.currentUrl = navRoute;
        this.currentUser = this.sharedService.currentUser = response; 
        this.router.navigate([navRoute]);
    }

}
