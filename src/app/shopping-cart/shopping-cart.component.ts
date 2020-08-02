import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MasterCart } from './../models/app-master-cart';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ShoppingCartSnackBarComponent } from './shopping-cart-snack-bar/shopping-cart-snack-bar.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  selectedVendorIds: string[] = [];
  displayedColumns = ['thumbnail', 'title', 'price', 'quantity', 'total_price'];
  masterCart: MasterCart
  sub: Subscription

  constructor(
    private cartService: ShoppingCartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { 
  }

  async ngOnInit(){
    this.sub = (await this.cartService.get()).subscribe(masterCart => {
      this.masterCart = masterCart;
      // this.openSnackBar();
    })
  }

  ngOnDestroy(){
    // this._snackBar.dismiss();
  }

  // openSnackBar() {
  //   this._snackBar.openFromComponent(ShoppingCartSnackBarComponent, {
  //     duration: -1,
  //     data: this.masterCart
  //   });
  // }

  async clearCart(){
    if(!confirm("Are you sure you want to clear the shopping cart?")) return;
    // await this.cart.clearCart();
  }

  addVendor(vendorId){
    this.selectedVendorIds.push(vendorId);
    // console.log('add', this.selectedVendorId);
    this.updateRouteParams();
  }

  removeVendor(vendorId){
    const index = this.selectedVendorIds.indexOf(vendorId);
    if (index > -1) {
      this.selectedVendorIds.splice(index, 1);
    }
    this.updateRouteParams();
    // console.log('remove', this.selectedVendorId);
  }

  updateRouteParams(){
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        selectedVendorIds: JSON.stringify(this.selectedVendorIds)
      },
      queryParamsHandling: 'merge'
    }
    
    this.router.navigate([], navigationExtras)
  }
}
