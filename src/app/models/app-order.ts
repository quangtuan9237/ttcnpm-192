import { ShoppingCart } from './app-shoping-cart';
export class AppOrder{
   userId: string;
   userName: string;
   datePlaced: number;
   items: any[];
   

   constructor(userId: string, userName: string, shoppingCart: ShoppingCart){
      this.userId = userId;
      this.userName = userName;
      this.datePlaced = new Date().getTime();
      this.items = shoppingCart.items.map(i => {
        return {
          // userName: i.userName,
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
   }
};