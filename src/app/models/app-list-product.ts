import { AppProduct } from './app-product';
export class AppProductList{
   // structure of arg 'object'
   //{
   //  -MA7PRczHMagZe1Uy5CZ: {<product fields>}
   // }
   private list: AppProduct[]

   constructor(objectProducts){
      if(objectProducts){
         let keys = Object.keys(objectProducts);

         this.list = keys.map((key) => {
            return new AppProduct(key ,objectProducts[key]);
         })
      }
   }

   get(){
      return this.list
   }
};