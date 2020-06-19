import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product){
    return this.db.list('/products').push(product);
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

  delete(id){
    this.db.object('/products/' + id).remove();
  }
}

