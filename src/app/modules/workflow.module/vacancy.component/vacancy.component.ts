import { Component, Input } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'vacancy',
	templateUrl: './vacancy.component.html',
 	styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent {
	@Input()
	info : any;

	constructor(private httpWrapperService: HttpWrapperService){}

  toggleFavorite(info) {
	    const request = {
        route: info.isFavorited ? 'removeFromFavoriteVacancy' : 'addToFavoriteVacancy',
        urlParams: {
          id: info.id
        },
        body : {},
        callback: (data, err) => {
          if(!err) {
            this.info.isFavorited = !this.info.isFavorited;
          }
        }
      };
      if (info.isFavorited) {
        delete request.body;
      }
      this.httpWrapperService.sendRequest(request);
  }

}
