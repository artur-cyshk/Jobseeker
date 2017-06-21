import { Component, Input } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'cv',
	templateUrl: './cv.component.html',
 	styleUrls: ['./cv.component.css']
})
export class CvComponent {
	@Input()
	info : any;

  constructor(private httpWrapperService: HttpWrapperService){}

  toggleFavorite(info) {
    const request = {
      route: info.isFavorited ? 'removeFromFavoriteCv' : 'addToFavoriteCv',
      urlParams: {
        id: info.id
      },
      body: {},
      callback: (data, err) => {
        if(!err) {
          this.info.isFavorited = !this.info.isFavorited;
        }
      }
    }
    if(info.isFavorited) {
      delete request.body;
    }
    this.httpWrapperService.sendRequest(request);
  }
}
