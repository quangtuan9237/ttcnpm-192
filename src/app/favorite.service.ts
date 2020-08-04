import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { zip, Observable, empty, of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
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

    return this.db.object(`/users/${userId}/favorite`).valueChanges() as Observable<{[key: string]: boolean}>
  }

  getAll(userId: string){
    return this.db.object(`/users/${userId}/favorite`).valueChanges().pipe(
      switchMap((setFavorites) => {
        if(!setFavorites){
          return of([])
        } 

        let listId = Object.keys(setFavorites)
        return zip(...listId.map((productId) => this.productService.get(productId)));
      })
    )
  }
  
  // getAll(userId: string){
  //   return this.db.object(`/users/${userId}/favorite`).valueChanges().pipe(
  //     switchMap((setFavorites) => {
  //       let favorites = setFavorites ? Object.keys(setFavorites) : [];
  //       return this.productService.getList(favorites);
  //     })
  //   )
  // }
}
