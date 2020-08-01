import { MasterCart } from './models/app-master-cart';
import { AppProduct } from './models/app-product';
import { ShoppingCart } from './models/app-shoping-cart';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { 

  }

  async get(){
    let id = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${id}`).valueChanges()
      .pipe(map(shoppingCart => {
        return new MasterCart(shoppingCart)
      }))
  }

  async addToCart(product: AppProduct){
    let cart_id = await this.getOrCreateCartId();
    let item = this.getItem(product.vendorId, cart_id, product.key)
    
    if(!(await item.once("value")).exists()){
      item.update({
        title: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        quantity: 1});
      return;
    }

    item.once("value").then(data => {
      item.update({quantity: data.val().quantity + 1})
    })
  }

  async removeFromCart(product: AppProduct){
    let cart_id = await this.getOrCreateCartId();
    let item = this.getItem(product.vendorId, cart_id, product.key)
    
    item.once("value").then(data => {
      if(data.val().quantity == 1){
        item.remove();
      }else{
        item.update({quantity: data.val().quantity - 1})
      }
    })
  }

  async clearCart(vendor_id){
    let id = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${id}/${vendor_id}/items`).remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(){
    let cart_id = localStorage.getItem('cart_id');
    if(!cart_id){
      cart_id = await this.create().key
      localStorage.setItem('cart_id', cart_id)
    }

    return cart_id
  }

  private getItem(vendor_id, cart_id, produc_id){
    // console.log(vendor_id)
    return this.db.database.ref(`/shopping-carts/${cart_id}/${vendor_id}/items/${produc_id}`);
  }
}
