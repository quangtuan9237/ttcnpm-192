import { AppProduct } from './app-product';
import { ShoppingCartItem } from './app-shoping-cart-item';

export class ShoppingCart{
   items: ShoppingCartItem[] = []

   constructor(objectShoppingCart){
      let items = objectShoppingCart.items
      if(!items) return;

      let keys = Object.keys(items)
      this.items = keys.map((key) => {
         return new ShoppingCartItem(items[key])
      })
   }

   get totalItemCount(){
      return this.items.reduce((acc, i) => acc + i.quantity, 0)
   }

   getItemQuantity(product: AppProduct){
      let item = this.items.find(item =>  item.product.key == product.key)

      if(item) return item.quantity

      return 0;
   }
};