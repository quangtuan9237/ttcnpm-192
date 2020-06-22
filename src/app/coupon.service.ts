import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(coupon){
    return this.db.list('/coupons').push(coupon);
  }

  getAll(){
    return this.db.list('/coupons').snapshotChanges().pipe(
      map(changes => changes.map(c => {
        let value:Object = c.payload.val();
        return { key: c.key, ...value}
      }))
    );
  }

  get(id){
    return this.db.object('/coupons/' + id).valueChanges();
  }

  update(id, coupon){
    this.db.object('/coupons/' + id).update(coupon);
  }

  delete(id){
    this.db.object('/coupons/' + id).remove();
  }
}

