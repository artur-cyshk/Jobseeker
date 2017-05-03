import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
 	styleUrls: ['./app.component.css']
})
export class AppComponent {

    private currentUrl: String;

    constructor(private router: Router) {}	

    ngOnInit() {
  		this.router.events
		    .filter(event => event instanceof RoutesRecognized)
		    .subscribe(this.routeChangedHandler.bind(this));
    }

    routeChangedHandler(event : any) {
        this.currentUrl = event.urlAfterRedirects || event.url;  
    }

}
