import ErrorMessage from '../models/error.model'
import Errors from '../models/errors.model'
/*@ngInject*/
export default class ErrorService {
    constructor ($timeout) {
        this.errorsObject = new Errors();
        this.$timeout = $timeout;
    }

    showError (error, header, timeout = true) {
        if( this.errorsObject.isMaximumSize() ) return;
        this.error = new ErrorMessage( error, this.errorsObject.list, header, timeout, this.$timeout);
        if( this.errorsObject.contains(this.error.value) ) return;
        this.errorsObject.addItem(this.error);
        this.error.setErrorTimeout(this.errorsObject);
        return this.error.value;
    }

    removeError(id) {
        this.errorsObject.remove(id);
        this.error.cancelErrorTimeout();
    }
}
