export class AppProduct{
   key: string = ""
   title: string = "";
   price: number = 0;
   category: string = "";
   imageUrl: string = "";
   vendorId: string = "";

   constructor(key, product){
      this.key = key
      this.title = product.title;
      this.price = product.price;
      this.category = product.category;
      this.imageUrl = product.imageUrl;
      this.vendorId = product.owner;
   }
};
