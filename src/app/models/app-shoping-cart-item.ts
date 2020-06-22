import { AppProduct } from './app-product';

export class ShoppingCartItem{
   key: string = ""
   title: string = "";
   price: number = 0;
   category: string = "";
   imageUrl: string = "";
   quantity: number

   constructor(item){
      Object.assign(this, item);
   }

   get totalPrice(){
      return this.quantity*this.price;
   }
};
