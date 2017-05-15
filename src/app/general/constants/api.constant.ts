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
		'updateUser' : {
			method : 'put',
			url : '/user'
		},
		'countries' : {
			method : 'get',
			url : '/countries'
		},
		'cities' : {
			method : 'get',
			url : '/cities/{countryId}'
		},
		'avatar' : {
			url : '/user/uploadAvatar'
		},
		'getCompanies' : {
			method : 'get',
			url : '/companies'
		},
		'postCompanies' : {
			method : 'post',
			url : '/companies'
		},
		'removeCompany' : {
			method : 'delete',
			url : '/companies/{id}'
		},
		'removeVacancy' : {
			method : 'delete',
			url : '/vacancies/{id}'
		}
	}
}