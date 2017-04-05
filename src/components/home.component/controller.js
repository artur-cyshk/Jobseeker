/*@ngInject*/
export default class Controller {
	constructor(restService){
		restService.httpRequest('logout', function(data){
			console.log(data);
		})
	}
}
