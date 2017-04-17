import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
 	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'app works!';
  	constructor(private httpWrapperService : HttpWrapperService){}
}
