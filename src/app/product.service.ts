import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map,switchMap } from 'rxjs/operators';
import { zip, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  create(uid, product){
    product.owner = uid;

    let id = this.db.createPushId();
    let payload = {}

    payload['/products/' + id] = product;
    payload[`/users/${uid}/products/${id}`] = true;

    return this.db.database.ref().update(payload);
  }

  getAllVendor(uid){
    return this.db.object(`/users/${uid}/products`).valueChanges().pipe(
      switchMap((setProducts : object) => {
        let listProduct:Observable<SnapshotAction<unknown>>[] = []
        for(const property in setProducts){
          if(setProducts[property] == true){
            listProduct.push(this.db.object(`/products/${property}`).snapshotChanges())
            // console.log(listProduct);
          }
        }

        return zip(...listProduct)
      })
    ).pipe(
      map(changes => changes.map(c => {
        let value:Object = c.payload.val();
        return { key: c.key, ...value}
      }))
    );
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => changes.map(c => {
        let value:Object = c.payload.val();
        return { key: c.key, ...value}
      }))
    );
  }

  get(id){
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id, product){
    this.db.object('/products/' + id).update(product);
  }

  delete(user_id, id){
    let payload = {}
    payload[`/products/${id}`] = null;
    payload[`/users/${user_id}/products/${id}`] = null;

    this.db.database.ref().update(payload);

    // this.db.object(`/products/${id}`).remove();
    // this.db.object(`/users/${user_id}/products/${id}`).remove();
  }
}

