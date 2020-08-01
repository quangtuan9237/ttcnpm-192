import { AppProduct } from './app-product';
import { ShoppingCartItem } from './app-shoping-cart-item';

export class ShoppingCart{
   items: ShoppingCartItem[] = []
   item_set: {[key: string]: ShoppingCartItem} = {}
   vendorId: string

   constructor(objectShoppingCart){
      this.vendorId = objectShoppingCart.vendorId;

      let items = objectShoppingCart.items
      if(!items) return;
      this.item_set = items;

      let keys = Object.keys(items)
      this.items = keys.map((key) => {
         let itemObj = new ShoppingCartItem({key: key, ...items[key]});
         // this.item_set[key] = itemObj;
         return itemObj
      })
   }

   getQuantity(product: AppProduct){
      let item = this.item_set[product.key];
      if(!item) return 0;

      return item.quantity;
   }

   get totalItemCount(){
      return this.items.reduce((acc, i) => acc + i.quantity, 0)
   }

   get totalPrice(){
      return this.items.reduce((acc, i) => acc + i.totalPrice, 0)
   }
};