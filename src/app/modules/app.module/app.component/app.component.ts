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

    private currentUrl: String;

    constructor(private router: Router,
                private sharedService : SharedService,
    			private httpWrapperService : HttpWrapperService) {}	

    ngOnInit() {
  		this.router.events
		    .filter(event => event instanceof RoutesRecognized)
		    .subscribe(this.routeChangedHandler.bind(this));
    }

    routeChangedHandler(event : any) {
        const availableUrls = ['/login', '/workflow', '/workflow/profile', '/workflow/favorites', '/workflow/board'];
        const isCurrentUrl = availableUrls.find( (url) => url == event.url );
        const isAfterRedirects = availableUrls.find( (url) => url == event.urlAfterRedirects );
        if(isAfterRedirects || isCurrentUrl) {
            this.checkUserAuthorization(isAfterRedirects || isCurrentUrl);
        }          
    }

    checkUserAuthorization(currentUrl : String) {
        this.currentUrl = currentUrl;
        this.httpWrapperService.sendRequest({
            route : 'authorized',
            callback : this.authorizedHandler.bind(this)
        });
    }

    authorizedHandler(response, error) {
        let navRoute : String = '';
        if(error) {
            navRoute = '/login';
        }else if(this.currentUrl === '/login'){
            navRoute = '/workflow/board';
        }else{
            navRoute = this.currentUrl;
        }
        
        if(!error){
            this.sharedService.setCurrentUser(response);
        }
        this.router.navigate([navRoute]);
    }

}
