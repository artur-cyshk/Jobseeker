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
        this.getCurrentUser();
        this.getAllCountries();
    }	

    currentUserResponseHandler(user, error) {
        if(user){
            this.sharedService.setCurrentUser(user);
            this.currentUser = user;
        }
    }

    getCurrentUser() {
        this.httpWrapperService.sendRequest({
            route : 'getUser',
            callback : this.currentUserResponseHandler.bind(this)
        })
    }

    setCurrentUser(user){
        this.currentUser = user;
    }

    getProfileAvatar(name) {
        return `./assets/images/avatars/${name || 'empty.png'}`;
    }

    getAllCountries() {
        this.httpWrapperService.sendRequest({
            route : 'countries',
            callback : this.countriesResponseHandler.bind(this)
        })
    }

    countriesResponseHandler(countries, error) {
        if(!error) {
            this.formData.countries = countries;
            this.getAllCitiesByContryId(countries[0].id);
        }
    }

    countryChanged(country) {
        this.currentUser.country = country;
        this.getAllCitiesByContryId(country.id);
    }

    getAllCitiesByContryId(countryId) {
        this.httpWrapperService.sendRequest({
            route : 'cities',
            callback : this.citiesResponseHandler.bind(this),
            urlParams : {
                countryId : countryId
            }
        })
    }

    citiesResponseHandler(cities, error){
        if(!error){
            this.formData.cities = cities;
            this.currentUser.city = cities[0] || {};
        }
    }

    cityChanged(city){
        this.currentUser.city = city;
    }

    setUserRole(currentRole : string) {
        this.currentUser.role = (currentRole === 'employer') ? 'jobseeker' : 'employer'; 
    }

}
