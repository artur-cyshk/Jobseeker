import { Injectable } from '@angular/core';
import { LocalStorageWrapperService } from './localStorageWrapper.service';

@Injectable()
export class JWTService{

	constructor(private localStorageWrapperService : LocalStorageWrapperService){}
	getToken() {
		return this.localStorageWrapperService.getItem('userToken');
	}

	setToken(token : String) {
		this.localStorageWrapperService.setItem('userToken', token);
	}

	removeToken() {
		this.localStorageWrapperService.removeItem('userToken');
	}
}