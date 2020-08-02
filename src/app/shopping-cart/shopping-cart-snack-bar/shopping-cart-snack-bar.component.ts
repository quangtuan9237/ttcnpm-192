import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MasterCart } from './../../models/app-master-cart';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart-snack-bar',
  templateUrl: './shopping-cart-snack-bar.component.html',
  styleUrls: ['./shopping-cart-snack-bar.component.scss']
})
export class ShoppingCartSnackBarComponent implements OnInit, OnDestroy {
  selectedVendorsIds: string[];
  totalPrice
  sub: Subscription

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public masterCart: MasterCart,
    activatedRoute: ActivatedRoute
  ) { 
    this.sub = activatedRoute.queryParamMap.subscribe(paramMap => {
      this.selectedVendorsIds = JSON.parse(paramMap.get('selectedVendorIds'));
      this.totalPrice = masterCart.getTotalPrice(this.selectedVendorsIds);
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
