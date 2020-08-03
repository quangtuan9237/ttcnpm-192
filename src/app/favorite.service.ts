import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { zip, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService
  ) { }

  create(product_id, user_id){
    return this.db.object(`/users/${user_id}/favorite/${product_id}`).set(true)
  }

  getAll(user_id){
    return this.db.object(`/users/${user_id}/favorite`).valueChanges().pipe(
      switchMap((setFavorites) => {
        let listId = Object.keys(setFavorites);
        console.log(listId);
        return zip(...listId.map((productId) => this.productService.get(productId)))
      })
    )
  }
}
