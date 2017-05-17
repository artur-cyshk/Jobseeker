import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx'; 

@Injectable()
export class SharedService {
	nowIsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private currentUser : BehaviorSubject<any> = new BehaviorSubject<any>({});
	private boardSettings : BehaviorSubject<any> = new BehaviorSubject<any>({});

	getBoardSettings(): Observable<any> {
		return this.boardSettings.asObservable();
	}

	setBoardSettings(boardSettings ?: any) {
		this.boardSettings.next(boardSettings);
	}

	getCurrentUser(): Observable<any> {
		return this.currentUser.asObservable();
	}

	setCurrentUser(currentUser ?: any) {
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