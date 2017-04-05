/*@ngInject*/
export default function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	var home = {
		name: 'home',
		url: '/home',
		component : 'home'
	}
	var login = {
		name: 'login',
		url: '/login',
		component : 'login'
	}
	$stateProvider.state(home);
	$stateProvider.state(login);
}