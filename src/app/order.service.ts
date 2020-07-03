import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  getAll(){
    return this.db.object('/orders').valueChanges().pipe(
      map(test => {
        console.log(test);
        return test;
      })
    )
  }


}
