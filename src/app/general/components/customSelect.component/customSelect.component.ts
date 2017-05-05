import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'custom-select',
    templateUrl: './customSelect.component.html',
    styleUrls: ['./customSelect.component.css']
})
export class CustomSelectComponent implements OnChanges{
  
    @Input()
    items : Array<any>;
    @Input()
    selectedItem : any;
    @Input()
    listVisible : boolean = false;

    filteredItems : Array<any> = [];
    searchValue : string;

    @Output()
    modelChange: EventEmitter<any> = new EventEmitter();

    @Input()
    customPlaceholder : string;

    ngOnChanges(changes) {
          if(changes.items && changes.items.currentValue) {
              this.filteredItems = changes.items.currentValue;
          }
          if(changes.selectedItem && changes.selectedItem.currentValue ) {
              this.searchValue = changes.selectedItem.currentValue.name;
          }
      }

    search(value) {
        this.filteredItems = this.getFilteredItems(value);
    }

    getFilteredItems(searchValue) {
        return this.items.filter( (item) =>  new RegExp(`^${searchValue}`, 'gi').test(item.name) );
    }

    selectItem(item) {
        this.selectedItem = item;
        this.searchValue = item.name;
        this.listVisible = false;
        this.modelChange.next(this.selectedItem);
    }
}