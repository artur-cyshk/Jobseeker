import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'multiselect',
    templateUrl: './multiselect.component.html',
    styleUrls: ['../customSelect.component/customSelect.component.css']
})
export class MultiselectComponent implements OnChanges{
  
    @Input()
    items : Array<any>;
    @Input()
    selectedItems : Array<any>;
    @Input()
    listVisible : boolean = false;

    filteredItems : Array<any> = [];


    @Output()
    modelChange: EventEmitter<any> = new EventEmitter();

    @Input()
    customPlaceholder : string;

    ngOnChanges(changes) {
          if(changes.items.currentValue && changes.items.currentValue.length > 0){
              this.filteredItems = changes.items.currentValue;
          }
      }

    search(value) {
        this.filteredItems = this.getFilteredItems(value);
    }

    getFilteredItems(searchValue) {
        return this.items.filter( (item) =>  new RegExp(`^${searchValue}`, 'gi').test(item.name) );
    }

    selectItem(item) {
        let foundItem = this.findItem(item);
        if(foundItem){
            let index = this.selectedItems.indexOf(foundItem);
            this.selectedItems.splice(index, 1);
        }else{
           this.selectedItems.push(item);      
        }
        this.modelChange.next(this.selectedItems);
    }

    findItem(item) {
        return this.selectedItems.find( (selectedItem) => selectedItem.id === item.id );
    }

}