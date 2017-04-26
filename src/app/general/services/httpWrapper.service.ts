import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { API } from '../constants/api.constant';

@Injectable()
export class HttpWrapperService{

	constructor(private http : Http){}

	getRequestOptions(params : any) {
		if(params && params.length > 0) {
			let urlSearchParams : URLSearchParams = new URLSearchParams();
			for(let key in params){
				urlSearchParams.set(key, params[key]);
			}
			let requestOptions = new RequestOptions();
			requestOptions.search = urlSearchParams;
			return requestOptions;
		}
	}

	sendRequest({route, callback, body, params, urlParams} : { route : string, callback : any, body ?: any, params ?: any, urlParams? : any}) {
		const currentRoute = API.routes[route];
		if(currentRoute){
			const routeInfo = {
				url : this.generateUrlString(API.host, currentRoute.url, urlParams),
				method : currentRoute.method,
				body : body,
				options : this.getRequestOptions(params)
			};
			this.sendExistingRequest(routeInfo).subscribe((response) => callback(response, null), (response) => callback(null, response));
		}
	}

	getDynamicParams(url : any, params : any) {
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
		console.log(res)
		let body = res.json();
		return body || [];
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