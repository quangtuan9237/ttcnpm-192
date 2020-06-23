import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cart: ShoppingCartService
  ) { }

  async create(order){
    let result = await this.db.list('/orders').push(order);
    this.cart.clearCart();
    return result;
  }
}
