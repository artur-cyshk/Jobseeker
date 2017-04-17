import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { API } from '../constants/api.constant';

@Injectable()
export class HttpWrapperService{

	constructor(private http : Http){}

	sendRequest(route : string){
		const currentRoute = API.routes[route];
		if(currentRoute){
			currentRoute.url = this.generateUrlString(API.host, currentRoute.url);
			this.sendExistingRequest(currentRoute).subscribe((data) => console.log(data));
		}
	}

	private generateUrlString(host : String, url : String){
		return `${host}${url}`;
	}

	private sendExistingRequest(currentRoute : any) : Observable<any> {
		return this.http[currentRoute.method](currentRoute.url)
			.map(this.extractData)
			.catch(this.handleError)
	}

	private extractData(res : Response){
		let body = res.json();
		return body || [];
	}

	private handleError (error : Response | any){
		let errMsg : string;
		if(error instanceof Response){
			const body = error.json() || '';
			const err = body.error|| JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		}else{
			errMsg = error.message ? error.message : error.toString();
		}
		console.log(errMsg);
		return Observable.throw(errMsg);
	}
}