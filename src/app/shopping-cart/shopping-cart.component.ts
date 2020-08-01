import { MasterCart } from './../models/app-master-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$ : Observable<MasterCart>;
  selectedVendorId: string[] = [];
  displayedColumns = ['thumbnail', 'title', 'price', 'quantity', 'total_price'];

  constructor(
    private cart: ShoppingCartService,
  ) { 
  }

  async ngOnInit(){
    this.cart$ = await this.cart.get()
  }

  async clearCart(){
    if(!confirm("Are you sure you want to clear the shopping cart?")) return;
    // await this.cart.clearCart();
  }

  addVendor(vendorId){
    this.selectedVendorId.push(vendorId);
    // console.log('add', this.selectedVendorId);
  }

  removeVendor(vendorId){
    const index = this.selectedVendorId.indexOf(vendorId);
    if (index > -1) {
      this.selectedVendorId.splice(index, 1);
    }
    // console.log('remove', this.selectedVendorId);
  }
}
