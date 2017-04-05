export default class Errors {
    constructor(){
    	this.MAX_ERROR_COUNT = 4;
    	this.list = [];
    }

    addItem(value) {
        this.list.push(value);
    }

    isMaximumSize() {
        return this.MAX_ERROR_COUNT < this.list.length;
    }

    contains(value) {
        return this.list.find((item) => item.value == value.toLowerCase());
    }

    remove(id) {
        this.list.splice(
            this.list.findIndex((item) => item.id == id),
            1
        );
    }
}