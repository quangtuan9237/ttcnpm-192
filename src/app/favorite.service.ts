import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { zip, Observable, Subscription, empty } from 'rxjs';
import { ProductService } from './product.service';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private userId: string = null;

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService,
  ) { 
  }

  create(product_id, user_id){
    return this.db.object(`/users/${user_id}/favorite/${product_id}`).set(true)
  }

  delete(product_id, user_id){
    return this.db.object(`/users/${user_id}/favorite/${product_id}`).remove()
  }

  getAllIds(userId: string){
    if(!userId) return empty();

    // (await this.db.database.ref(`/users/${userId}/favorite`).once()).exists()

    return this.db.object(`/users/${userId}/favorite`).valueChanges() as Observable<{[key: string]: boolean}>
  }

  getAll(userId: string){
    return this.db.object(`/users/${userId}/favorite`).valueChanges().pipe(
      switchMap((setFavorites) => {
        let listId = Object.keys(setFavorites);
        console.log(listId);
        return zip(...listId.map((productId) => this.productService.get(productId)))
      })
    )
  }
}
