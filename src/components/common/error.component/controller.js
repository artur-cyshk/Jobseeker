/*@ngInject*/
export default class Controller {

    constructor(errorService) {
    	this.errorService = errorService;
    	this.errors = this.errorService.errorsObject.list;
    }

    removeError(id) {
        this.errorService.removeError(id);
    }
}
