import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx'; 

@Injectable()
export class SharedService {
	nowIsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private currentUser : BehaviorSubject<any> = new BehaviorSubject<any>({});

	getCurrentUser(): Observable<any> {
		return this.currentUser.asObservable();
	}

	setCurrentUser(currentUser : any) {
		this.currentUser.next(currentUser);
	}

	getLoadingState(): Observable<boolean>{
		return this.nowIsLoading.asObservable();
	}

	toogleLoading(value ?: boolean) {
		const newValue = (value) ? value : !this.nowIsLoading.getValue();
		this.nowIsLoading.next(newValue);
	}
}