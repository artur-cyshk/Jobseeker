import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

	constructor( private router : Router ){}

	checkPermision(status) {
		console.log(status);
		return (status === 401) ? this.redirectToLogin() : true;
	}
	private redirectToLogin(){
		this.router.navigate(['/login']);
	}
}