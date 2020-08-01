import { Subscription, Observable } from 'rxjs';
import { RoleService } from './../role.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCart } from '../models/app-shoping-cart';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input('shopping-cart') cart: ShoppingCart;
  @Input('displayed-columns') displayedColumns: string[];
  @Input('allow-action') allowAction: boolean = false;
  @Output('selected') selected = new EventEmitter<boolean>();
  @Output('removed') removed = new EventEmitter<boolean>();
  checked
  vendors$: Observable<any>

  constructor(
    private roleService: RoleService
  ) {
    this.vendors$ = this.roleService.getAllVendor();

  }

  ngOnInit(): void {
  }

  onSelectVendor(vendorId){
    // console.log(vendorId);
    if(this.checked){
      this.selected.emit(vendorId)
    }else{
      this.removed.emit(vendorId)
    }
  }

}
