export class AppProduct{
   title: string = "";
   price: string = "";
   category: string = "";
   imageUrl: string = "";

   constructor(user?){
      if(user){
         this.title = user.title;
         this.price = user.price;
         this.category = user.category;
         this.imageUrl = user.imageUrl;
      }
   }
};