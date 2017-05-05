export const API = {
	host : 'http://localhost:3000/api',
	routes : {
		'login' : {
			method : 'post',
			url : '/login'
		},
		'signUp' : {
			method : 'post',
			url : '/registration'
		},
		'getUser' : {
			method : 'get',
			url : '/user'
		},
		'countries' : {
			method : 'get',
			url : '/countries'
		},
		'cities' : {
			method : 'get',
			url : '/cities/{countryId}'
		}
	}
}