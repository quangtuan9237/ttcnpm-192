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

  // getOders() {
  //   return this.db.list('/orders')
  // }

  getOrdersByUser(userId: string) {
    // cai nay return 1 list, list ko co id nua roi :) gio chi muon co id :)
    // co nen query nhu nay? idk :/ cung duoc :/
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
    // .valueChanges().pipe( // chi xai value change no se ko co id neu' la list ok?uhm
    //   map(test => {
    //     console.log(test);
    //     return test
    //   })
    // )

    .snapshotChanges().pipe( // trong cai nay no' co key ne
      map(snapshot => {
        return snapshot.map(snap => {
          let val = snap.payload.val();
          val['key'] = snap.key;
          return val
        })
      })
    )
  }
  // chi sua gi r cai nay chi them vao ma em co lam ham nay dau ok :)
  // uas thi noi binh thuong thoi an noi kieu gi vay

  // getOrdersByUser(user_id){
  //   return this.db.object(`/orders`).valueChanges().pipe(
  //     switchMap((setProducts) => {
  //       let listId = Object.keys(setProducts);

  //       return zip(...listId.map((id) => this.get(id)))
  //     })
  //   )
  // }


  getAll(){
    // khac nhau nha :)  cai nay return 1 dictionary
    return this.db.object('/orders').valueChanges().pipe(
      map(test => {
        // console.log(test);
        return test
      })
    )
  }
}
