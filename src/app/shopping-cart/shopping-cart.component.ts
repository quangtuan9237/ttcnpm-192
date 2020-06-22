import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/app-shoping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$ : Observable<ShoppingCart>

  displayedColumns = ['thumbnail', 'title', 'quantity', 'total_price'];

  constructor(
    private cart: ShoppingCartService,
  ) { 
  }

  async ngOnInit(){
    this.cart$ = await this.cart.get()
  }

  async clearCart(){
    if(!confirm("Are you sure you want to clear the shopping cart?")) return;
    await this.cart.clearCart();
  }
}
