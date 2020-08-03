import { AppProduct } from './models/app-product';
import { AppProductList } from './models/app-list-product';
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

  create(user_id, product){
    product.owner = user_id;

    let id = this.db.createPushId();
    let payload = {}

    payload['/products/' + id] = product;
    payload[`/users/${user_id}/products/${id}`] = true;

    return this.db.database.ref().update(payload);
  }

  // get products by user ne,
  // no vao duong dan~ /users/<user_id>/products, de lay ra 1 danh sach , sau do moi mot key trong cai list product do
  // se~ duoc lay 
  getAllVendor(user_id){
    return this.db.object(`/users/${user_id}/products`).valueChanges().pipe(
      switchMap((setProducts) => {
        let listId = Object.keys(setProducts);
// ung' voi moi~ 1 id, se~ goi ham this.get(id)
        return zip(...listId.map((id) => this.get(id)))
      })
    )
  }

  getAll(){
    return this.db.object('/products').valueChanges().pipe(
      map(value => {
        return new AppProductList(value).get()
      })
    )
  }

  get(id){
    return this.db.object('/products/' + id).snapshotChanges().pipe( 
      map(snapshot => new AppProduct(snapshot.key, snapshot.payload.val()))
    )
  }

  update(id, product){
    this.db.object('/products/' + id).update(product);
  }

  delete(user_id, id){
    let payload = {}
    payload[`/products/${id}`] = null;
    payload[`/users/${user_id}/products/${id}`] = null;

    this.db.database.ref().update(payload);
  }
}

