import { AppProduct } from './app-product';
import { ShoppingCart } from './app-shoping-cart';

export class MasterCart{
   cartList: ShoppingCart[] = [];
   cartList_set: {[key:string]: ShoppingCart} = {};

   constructor(objectMasterCart){

      let keys = Object.keys(objectMasterCart)
      if(!keys) return;

      this.cartList = keys.map((key) => {
         let itemObj = new ShoppingCart(objectMasterCart[key]);

         this.cartList_set[key] = itemObj

         return itemObj
      })
   }

   getQuantity(product: AppProduct){
      let shoppingCart = this.cartList_set[product.vendorId];
      if(!shoppingCart) return 0;

      return shoppingCart.getQuantity(product);
   }

   get totalItemCount(){
      return this.cartList.reduce((acc, i) => acc + i.totalItemCount, 0)
   }
};