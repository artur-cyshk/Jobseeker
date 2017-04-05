/*@ngInject*/
export default class Rest {
	constructor($http, URLS) {
		this.$http = $http;
		this.URLS = URLS;
	}
	success (callback) {
		return (data, status) => callback(data,status, null);
	}

	error (callback) {
		return (err, status) => callback(null, status, err);
	}

	request (method, callback, ...params) {
		this.$http[method].apply(null, params)
			.then(this.success(callback), this.error(callback));
	}

	hostAdd (url) {
		return this.URLS.host + url;
	}

	urlParamsSet (url, params) {
		for(var key in params){
			url = url.replace('{' + key + '}', params[key]);
		}
		return this.hostAdd(url);
	}

	httpRequest (field, callback, urlParams, queryParams, body) {
		if (!this.URLS[field]) {
			return;
		}
		if (queryParams) {
			queryParams = {
				'params' : queryParams
			};
		}
		this.request(
			this.URLS[field].method,
			callback,
			this.urlParamsSet(this.URLS[field].url, urlParams),
			queryParams,
			body
		);
	}
}
