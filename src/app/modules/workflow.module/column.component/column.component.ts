import { Component, Input } from '@angular/core';

@Component({
 	selector: 'column',
	templateUrl: './column.component.html',
 	styleUrls: ['./column.component.css']
})
export class ColumnComponent {
	@Input()
	columnData : any;
}
