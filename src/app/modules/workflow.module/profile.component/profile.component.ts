import { Component, Input } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
@Component({
 	selector: 'profile',
	templateUrl: './profile.component.html',
 	styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

    currentUser : any;

    formData : any = {
        countries : [],
        cities : []
    }
    
    constructor( private sharedService : SharedService, private httpWrapperService : HttpWrapperService ) {
        this.currentUser = sharedService.getCurrentUser().subscribe( (result)=> this.setCurrentUser(result) );
        this.getAllCountries();
    }	

    setCurrentUser(user){
        this.currentUser = user;
    }

    getProfileAvatar(name) {
        return `./assets/images/avatars/${name || 'empty.png'}`;
    }

    countriesResponseHandler(countries, error) {
        if(!error) {
            this.formData.countries = countries;
        }
    }

    getAllCountries() {
        this.httpWrapperService.sendRequest({
            route : 'countries',
            callback : this.countriesResponseHandler.bind(this)
        })
    }

    getAllCitiesByContryId(countryId) {

    }

}
