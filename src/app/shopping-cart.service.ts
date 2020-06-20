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

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
  
  async get(){
    let id = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${id}`).valueChanges();
  }

  private async getOrCreateCartId(){
    let cart_id = localStorage.getItem('cart_id');
    if(!cart_id){
      cart_id = await this.create().key
      localStorage.setItem('cart_id', cart_id)
    }

    return cart_id
  }

  private getItem(cart_id, produc_id){
    return this.db.database.ref(`/shopping-carts/${cart_id}/items/${produc_id}`);
  }

  async addToCart(product){
    let cart_id = await this.getOrCreateCartId();
    let item = this.getItem(cart_id, product.key)
    
    if(!(await item.once("value")).exists()){
      item.update({product: product, quantity: 1});
      return;
    }

    item.once("value").then(data => {
      item.update({quantity: data.val().quantity + 1})
    })
  }

  async removeFromCart(product){
    let cart_id = await this.getOrCreateCartId();
    let item = this.getItem(cart_id, product.key)
    
    item.once("value").then(data => {
      if(data.val().quantity == 1){
        item.remove();
      }else{
        item.update({quantity: data.val().quantity - 1})
      }
    })
  }
}
