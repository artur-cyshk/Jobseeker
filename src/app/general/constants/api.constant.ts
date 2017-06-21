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
		},
		'postVacancy' : {
			method : 'post',
			url : '/vacancies'
		},
		'getVacancyById' : {
			method : 'get',
			url : '/vacancies/{id}'
		},
		'putVacancy' : {
			method : 'put',
			url : '/vacancies'
		},
		'removeCv' : {
			method : 'delete',
			url : '/cvs/{id}'
		},
		'postCv' : {
			method : 'post',
			url : '/cvs'
		},
		'getCvById' : {
			method : 'get',
			url : '/cvs/{id}'
		},
		'getAllCvs' : {
			method : 'get',
			url : '/cvs'
		},
		'putCv' : {
			method : 'put',
			url : '/cvs'
		},
		'getSkills' : {
			method : 'get',
			url : '/skills'
		},
		'getLanguages' : {
			method : 'get',
			url : '/languages'
		},
		'favorites' : {
			method : 'get',
			url : '/favorite'
		},
		'removeFavoriteVacancies' : {
			method : 'delete',
			url : '/favoriteVacancies/{id}'
		},
		'removeFavoriteCvs' : {
			method : 'delete',
			url : '/favoriteCvs/{id}'
		},
		'status' : {
			method : 'get',
			url : '/status'
		},
		'filteredCvs': {
			method: 'post',
			url: '/filteredCvs'
		},
		'filteredVacancies': {
			method: 'post',
			url: '/filteredVacancies'
		},
    'addToFavoriteVacancy': {
      method: 'put',
      url: '/favoriteVacancies/{id}'
    },
    'removeFromFavoriteVacancy': {
      method: 'delete',
      url: '/favoriteVacancies/{id}'
    },
    'addToFavoriteCv': {
      method: 'put',
      url: '/favoriteCvs/{id}'
    },
    'removeFromFavoriteCv': {
      method: 'delete',
      url: '/favoriteCvs/{id}'
    }
	}
}
