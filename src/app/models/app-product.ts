export class AppProduct{
   key: string = ""
   title: string = "";
   price: string = "";
   category: string = "";
   imageUrl: string = "";

   constructor(key, product){
      this.key = key
      this.title = product.title;
      this.price = product.price;
      this.category = product.category;
      this.imageUrl = product.imageUrl;
   }
};