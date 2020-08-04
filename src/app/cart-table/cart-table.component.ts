import { Subscription, Observable } from 'rxjs';
import { RoleService } from './../role.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { ShoppingCart } from '../models/app-shoping-cart';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input('shopping-cart') cart: ShoppingCart;
  @Input('displayed-columns') displayedColumns: string[];
  @Input('allow-action') allowAction: boolean = false;
  @Output('selected') selected = new EventEmitter<boolean>();
  @Output('removed') removed = new EventEmitter<boolean>();
  checked: boolean = false;
  vendors$: Observable<any>;
  sub: Subscription;
  selectedVendorIds: Array<string>;

  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.vendors$ = this.roleService.getAllVendor();

    this.sub = this.activatedRoute.queryParamMap.subscribe(paramMap => {
      this.selectedVendorIds = JSON.parse(paramMap.get('selectedVendorIds'));
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.cart && this.selectedVendorIds && this.selectedVendorIds.length){
      if(this.selectedVendorIds.includes(this.cart.vendorId)) {
        this.checked = true;
      }
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
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
