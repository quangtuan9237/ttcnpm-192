import { AppProduct } from './app-product';

export class ShoppingCartItem{
   product: AppProduct
   quantity: number

   constructor(item){
      this.product = item.product;
      this.quantity = item.quantity
   }
};
