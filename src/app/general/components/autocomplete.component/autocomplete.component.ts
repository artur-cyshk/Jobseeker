import {Component, Input, Output, OnInit, DoCheck, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'custom-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class CustomAutocompleteComponent implements OnInit, DoCheck{
  
  @Input()
  items : Array<any>;
  @Input()
  model: any;
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  ngDoCheck() {
    this.modelChange.next(this.model);
  }

  @Input()
  customPlaceholder : string;

  itemCtrl = new FormControl({value : '54115'}, Validators.required);
  filteredItems: Observable<any[]>;

   change() { 
      this.filteredItems = this.itemCtrl.valueChanges
         .startWith(null)
         .map(name => name ? this.filter(name) : this.items.slice() );
   }

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