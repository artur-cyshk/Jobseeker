import { Component, Input } from '@angular/core';

@Component({
 	selector: 'vacancy',
	templateUrl: './vacancy.component.html',
 	styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent {
	@Input()
	info : any;
}
