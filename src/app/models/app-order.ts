import { ShoppingCart } from './app-shoping-cart';
export class AppOrder{
  status: number;
  userId: string;
  datePlaced: number;
  items: any[];
  vendorId: string;

  constructor(userId: string, inputData: ShoppingCart | any){
    this.userId = userId;
    this.datePlaced = inputData.datePlaced | new Date().getTime();
    this.status = inputData.status | 0;
    this.vendorId = inputData.vendorId;

    this.items = inputData.items.map(i => {
      return {
        title: i.title,
        imageUrl: i.imageUrl,
        price: i.price,
        quantity: i.quantity,
        totalPrice: i.totalPrice,
        vendorId: i.vendorId
      }
    })
  }

  isUserUnknow(){
    return this.userId === "0"
  }

  get totalItemCount(){
    return this.items.reduce((acc, i) => acc + i.quantity, 0)
  }

  get totalPrice(){
    return this.items.reduce((acc, i) => acc + i.totalPrice, 0)
  }
};