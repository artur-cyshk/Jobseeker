import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { Router, NavigationStart } from '@angular/router';
import { Response } from '@angular/http';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
 	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(private router: Router,
    			private httpWrapperService : HttpWrapperService,
    			private localStorageWrapperService : LocalStorageWrapperService) {}	

    authorizedHandler(response, error) {
    	console.log(response, error);
    }

    ngOnInit(){
  		this.router.events
		    .filter(event => event instanceof NavigationStart)
		    .subscribe(this.routeChangedHandler.bind(this));
    }

    checkUserAuthorization(currentUrl : String) {
        this.httpWrapperService.sendRequest({
            route : 'authorized',
            callback : this.authorizedHandler.bind(this)
        });
    }

    routeChangedHandler(event : any) {
        const currentUrl = event.url;
        if( currentUrl === "/login" || currentUrl === "/workflow" ) {
            this.checkUserAuthorization(currentUrl);
        }  		
    }
}
