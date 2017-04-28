import { Component } from '@angular/core';

@Component({
 	selector: 'board',
	templateUrl: './board.component.html',
 	styleUrls: ['./board.component.css']
})
export class BoardComponent {
	columns : Array<any> = [{title : 'a'}, {title : 'b'}, {title : 'c'}, {title : 'd'}, {title : 'e'}, {title : 'f'}];
	options = {
		animation: 200,
		handle: ".fa-arrows-h",
		onUpdate: (event: any) => {
      		console.log(this.columns);
    	} 
	}
}
