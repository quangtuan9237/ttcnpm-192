import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, switchMap, zip } from 'rxjs/operators';

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

  // getOders() {
  //   return this.db.list('/orders')
  // }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
    .valueChanges().pipe(
      map(test => {
        console.log(test);
        return test
      })
    )
  }

  // getOrdersByUser(user_id){
  //   return this.db.object(`/orders`).valueChanges().pipe(
  //     switchMap((setProducts) => {
  //       let listId = Object.keys(setProducts);

  //       return zip(...listId.map((id) => this.get(id)))
  //     })
  //   )
  // }


  getAll(){
    return this.db.object('/orders').valueChanges().pipe(
      map(test => {
        // console.log(test);
        return test
      })
    )
  }
}
