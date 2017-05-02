import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'custom-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class CustomAutocompleteComponent implements OnInit{
  
  @Input()
  items : any;

  @Input()
  customPlaceholder : string;

  itemCtrl: FormControl;
  filteredItems: any;

  constructor() {
    this.itemCtrl = new FormControl();
    this.filterItems = this.items;
    this.itemCtrl.valueChanges.subscribe((value) => console.log(value))
  }

  ngOnInit() {
  	console.log(this.items);
  }

  filterItems(val: string) {
    return val ? this.filteredItems.filter(s => new RegExp(`^${val}`, 'gi').test(s))
               : this.filteredItems;
  }

}