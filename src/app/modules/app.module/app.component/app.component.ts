import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { Router, RoutesRecognized } from '@angular/router';
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

    ngOnInit(){
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
        this.router.navigate([navRoute]);
    }

}
