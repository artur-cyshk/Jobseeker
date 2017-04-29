import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx'; 

@Injectable()
export class SharedService {
	nowIsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	currentUser : any;

	getLoadingState(): Observable<boolean>{
		return this.nowIsLoading.asObservable();
	}

	toogleLoading(value ?: boolean) {
		const newValue = (value) ? value : !this.nowIsLoading.getValue();
		this.nowIsLoading.next(newValue);
	}
}