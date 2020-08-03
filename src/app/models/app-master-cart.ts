import { AppProduct } from './app-product';
import { ShoppingCart } from './app-shoping-cart';

export class MasterCart{
   cartList: ShoppingCart[] = [];
   cartList_set: {[key:string]: ShoppingCart} = {};

   constructor(objectMasterCart){
      if(!objectMasterCart) return;

      let keys = Object.keys(objectMasterCart)
      if(!keys) return;

      keys.forEach((key) => {
         if(!objectMasterCart[key]) return;

         let itemObj = new ShoppingCart({vendorId: key, ...objectMasterCart[key]});

         this.cartList_set[key] = itemObj

         this.cartList.push(itemObj)
      })
   }

   getQuantity(product: AppProduct){
      let shoppingCart = this.cartList_set[product.vendorId];
      if(!shoppingCart) return 0;

      return shoppingCart.getQuantity(product);
   }

   getTotalPrice(vendorIds: string[]){
      // console.log(vendorIds);
      if(!vendorIds || vendorIds.length == 0) return 0;

      let cartOfVendors = vendorIds.map(id => {
         return this.cartList_set[id];
      })
      // console.log(cartOfVendors);

      return cartOfVendors.reduce((acc, i) => {
         return acc + i.totalPrice
      }, 0)
   }

   getSelectedCart(vendorIds: string[]){
      return vendorIds.map(id => {
         return this.cartList_set[id];
      })
   }

   get totalItemCount(){
      return this.cartList.reduce((acc, i) => acc + i.totalItemCount, 0)
   }
};