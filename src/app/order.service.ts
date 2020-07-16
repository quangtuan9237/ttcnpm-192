import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, switchMap, zip } from 'rxjs/operators';
import { domainToUnicode } from 'url';

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

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
    .snapshotChanges().pipe( 
      map(snapshot => {
        return snapshot.map(snap => {
          let val = snap.payload.val();
          val['key'] = snap.key;
          return val
        })
      })
    )
  }

  getOrdersById(orderId: string) { 
    return this.db.object(`/orders/${orderId}`).valueChanges(); 
  }

  getAll(){
    return this.db.object('/orders').valueChanges().pipe(
      map(test => {
        console.log(test);
        return test
      })
    )
  }

}
