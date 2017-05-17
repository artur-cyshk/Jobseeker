import { Component, Input } from '@angular/core';

@Component({
 	selector: 'cv',
	templateUrl: './cv.component.html',
 	styleUrls: ['./cv.component.css']
})
export class CvComponent {
	@Input()
	info : any;
}
