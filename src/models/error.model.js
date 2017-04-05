export default class ErrorMessage {

    constructor (error, errors, header, timeout = true, $timeout) {
        this.id = this.getUniqueId(errors); 
        this.$timeout = $timeout;
        this.value = this.getErrorMessage(error).toLowerCase();
        this.header = header || 'Error';
        this.timeout = timeout;
        this.TIMEOUT_MILLISECONDS = 5000;
    }

    getUniqueId (errors) {
        let rand = Math.random();
        while( errors.find( (item)=> item.id == rand) )  {
            rand = Math.random();
        }
        return rand;
    }

    getErrorMessage (error) {
        const unknownText = "Unknown error";
        let message = unknownText;
        message = (typeof error == 'string') ? error : message;
        if(typeof error == 'object') {
            message = (error.status == 401) ? 'Please, authorize!' : (error.message || unknownText);
        }
        return message;
    }


    setErrorTimeout (errors) {
        this.timer = (this.timeout) ? this.$timeout(
            () => {
                errors.remove(this.id);
            },
            this.TIMEOUT_MILLISECONDS
        ) : undefined;
    }

    cancelErrorTimeout() {
        if(this.timer) {
            this.$timeout.cancel(this.timer);
        }
    }
}