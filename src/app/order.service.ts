import { AppOrder } from './models/app-order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, switchMap} from 'rxjs/operators';
import { zip } from 'rxjs';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cart: ShoppingCartService
  ) { }

  async create(orders: Array<AppOrder>): Promise<Array<string>>{
    let ret: Array<string> = [] 
    for (let order of orders){
      let result = await this.db.list(`orders/`).push(order)

      if(!order.isUserUnknow()){
        await this.db.object(`users/${order.userId}/selfOrders/${result.key}`).set(true);
      }

      await this.db.object(`users/${order.vendorId}/orders/${result.key}`).set(true);

      ret.push(result.key);

      this.cart.clearCart(order.vendorId)
    }

    return ret;
  }

  getSeflOrders(userId: string){
    return this.db.object(`users/${userId}/selfOrders`).valueChanges().pipe(
      switchMap((setSelfOrders) => {
        if(!setSelfOrders) return empty();

        let listId = Object.keys(setSelfOrders);
        return zip(...listId.map((id) => this.get(id)))
      })
    )
  }

  getVenderOrders(vendorId: string) {
    return this.db.object(`users/${vendorId}/orders`).valueChanges().pipe(
      switchMap((setOrders) => {
        if(!setOrders) return empty();

        let listId = Object.keys(setOrders);
        return zip(...listId.map((id) => this.get(id)))
      })
    )
  }

  get(orderId: string) { 
    return this.db.object(`orders/${orderId}/`).snapshotChanges().pipe(
      map(snapshot => {
        return {key: snapshot.key, ...snapshot.payload.val() as object}
      })
    )
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
