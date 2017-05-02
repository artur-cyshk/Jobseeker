import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import  { Headers } from '@angular/http';
import { API } from '../constants/api.constant';
import { LocalStorageWrapperService } from './localStorageWrapper.service';
import { JWTService } from './jwt.service';
import {MdSnackBar} from '@angular/material';
import { SharedService } from './shared.service';

@Injectable()
export class HttpWrapperService{

	constructor(private http : Http,
				private snackBar : MdSnackBar,
				private sharedService : SharedService,
				private localStorageWrapperService : LocalStorageWrapperService,
				private jwtService : JWTService){}

	private getRequestOptions(params : any) {
		let requestOptions = new RequestOptions();
		requestOptions.search = this.getSearchParams(params);
		requestOptions.headers = this.getHeaders();
		return requestOptions;
	}

	private getSearchParams(params : any) {
		if(params && params.length > 0) {
			let urlSearchParams : URLSearchParams = new URLSearchParams();
			for(let key in params){
				urlSearchParams.set(key, params[key]);
			}
			return urlSearchParams;
		}
	}

	private getToken() {
		return this.jwtService.getToken();
	}

	private setAuthorizationHeader(headers : Headers) {
		const token = this.getToken();
		headers.append('Authorization', `JWT ${token}`);
	}

	private getHeaders() {
		let headers = new Headers();
		this.setAuthorizationHeader(headers);
		return headers;
	}

	sendRequest({route, callback, body, params, urlParams, isErrorDisplayingNeeded, successMessage} : { route : string, callback : any, body ?: any, params ?: any, urlParams? : any, isErrorDisplayingNeeded ?: boolean, successMessage ?: string}) {
        this.sharedService.toogleLoading();
		const currentRoute = API.routes[route];
		if(currentRoute){
			const routeInfo = {
				url : this.generateUrlString(API.host, currentRoute.url, urlParams),
				method : currentRoute.method,
				body : body,
				options : this.getRequestOptions(params)
			};
			this.sendExistingRequest(routeInfo).subscribe((response) => this.responseHandler(callback, isErrorDisplayingNeeded, successMessage, response, null), (response) => this.responseHandler(callback, isErrorDisplayingNeeded, successMessage, null, response));
		}
	}

	private responseHandler(callback, isErrorDisplayingNeeded, successMessage, response, error) {
		if(error) {
			if(isErrorDisplayingNeeded) {
				this.openSnackBar(error);
			}
		}else if(successMessage) {
			this.openSnackBar(successMessage);
		}
		this.sharedService.toogleLoading();
		callback(response, error);
	}

	private openSnackBar(message) {
        this.snackBar.open(message, 'close', {
            duration: 10000,
        });
	}

	private getDynamicParams(url : any, params : any) {
		for(let key in params){
			url = url.replace(`{${key}}`, params[key]);
		}
		return url;
	}

	private generateUrlString(host : String, url : String, params ?: any) {
		return `${host}${this.getDynamicParams(url, params)}`;
	}

	private sendExistingRequest(currentRoute : any) : Observable<any> {
		let httpParams = [currentRoute.url, currentRoute.body, currentRoute.options].filter( (item) => item != undefined );
		return this.http[currentRoute.method].apply(this.http, httpParams)
			.map(this.extractData)
			.catch(this.handleError)
	}

	private extractData(res : Response){
		let body = res.json();
		return body || {};
	}

	private handleError (error : Response | any){
		let errMsg : string;
		if(error instanceof Response){
			const body = error.json();
			errMsg = body ? body : error.statusText;
		}
		errMsg = errMsg ? errMsg : error;
		return Observable.throw(errMsg);
	}
}