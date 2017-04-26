import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { LocalStorageWrapperService } from '../../../general/services/localStorageWrapper.service';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
 	styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router,
    			private localStorageWrapperService : LocalStorageWrapperService) {
  		router.events
		    .filter(event => event instanceof NavigationStart)
		    .subscribe(this.routeChangedHandler);
    };	
    getToken() {
    	return this.localStorageWrapperService.getItem('userToken');
    }

    routeChangedHandler(event : Event) {
    	console.log(event);
    }
}
