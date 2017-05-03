import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'custom-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class CustomAutocompleteComponent implements OnInit{
  
  @Input()
  items : Array<any>;

  @Input()
  customPlaceholder : string;

  itemCtrl = new FormControl('', Validators.required);
  filteredItems: Observable<any[]>;

   ngOnInit() { 
      this.filteredItems = this.itemCtrl.valueChanges
         .startWith(null)
         .map(name => name ? this.filter(name) : this.items.slice() );
   }

   filter(searchValue: string): any[] {
      return this.items.filter(item => new RegExp(`^${searchValue}`, 'gi').test(item.name)); 
   }

   displayFn(item: any): string {
      return item ? item.name : item;
   }

}