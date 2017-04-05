/*@ngInject*/
export default class StorageService {
	constructor($window) {
		this.localStorage = $window.localStorage;
	}

	setItem(field, value) {
		this.localStorage.setItem(field, JSON.stringify(value));
	}

	getItem(field) {
		const value = this.localStorage.getItem(field);
		return (!value) ? false : JSON.parse(value);
	}
}