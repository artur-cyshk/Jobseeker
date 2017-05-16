import { Component } from '@angular/core';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'favorites',
	templateUrl: './favorites.component.html',
 	styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
	favorites : any = {
		cvs : [],
		vacancies : []
	};
	currentItem : any = {};
	constructor(private httpWrapperService : HttpWrapperService) {
		this.getAllFavorites();
	}

	getAllFavorites() {
		this.httpWrapperService.sendRequest({
			route : 'favorites',
			callback : (result, error) => {
				if(!error) {
					this.favorites = result;
				}
			}
		});
	}

	toggleItem(selectedItem, type){
		const routeType = type.split('').map((item, i) => i == 0 ? item.toUpperCase() : item).join('');
		if(selectedItem[`${type}Id`] === this.currentItem.id && type === this.currentItem.type) {
			this.currentItem = {};
		}else{
			this.httpWrapperService.sendRequest({
				route : `get${routeType}ById`,
				urlParams : {
					id : selectedItem[`${type}Id`]
				},
				callback : (result, error) => {
					if(!error) {
						this.currentItem = result;
						this.currentItem.type = type;
					}
				}
			})
		}
	}

	removeItem(event, itemId, type){
		event.stopPropagation();
		const routeType = type.split('').map((item, i) => i == 0 ? item.toUpperCase() : item).join('');
		this.httpWrapperService.sendRequest({
			route: `removeFavorite${routeType}`,
			urlParams : {
				id : itemId
			},
			callback : (result, error) => {
				if(!error) {
					const index = this.favorites[type].findIndex((item) => item.id == itemId);
					this.favorites[type].splice(index, 1);
				}
			}
		})
	}
}
