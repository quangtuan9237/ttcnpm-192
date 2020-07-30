import { ShoppingCart } from './app-shoping-cart';
export class AppOrder{
  userId: string;
  datePlaced: number;
  items: any[];
  status: string;

  constructor(userId: string, status: string, shoppingCart: ShoppingCart){
    this.userId = userId;
    this.datePlaced = new Date().getTime();
    this.status = status;

    this.items = shoppingCart.items.map(i => {
      return {
        title: i.title,
        imageUrl: i.imageUrl,
        price: i.price,
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }

  get totalItemCount(){
    return this.items.reduce((acc, i) => acc + i.quantity, 0)
  }

  get totalPrice(){
    return this.items.reduce((acc, i) => acc + i.totalPrice, 0)
  }
};