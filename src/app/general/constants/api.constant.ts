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
		'authorized' : {
			method : 'get',
			url : '/authorized'
		},
		'countries' : {
			method : 'get',
			url : '/countries'
		}
	}
}