export class AppUser{
   name: string
   email: string
   role: string

   constructor(user){
      // console.log("HELLO WORLD");
      this.name = user.name;
      this.email = user.email;
      this.role = user.role || 'normal';
   }

   get isCook(): boolean{
      return this.role == "cook";
   }

   get isVendor(): boolean{
      return this.role == "vendor";
   }

   get isAdmin(): boolean{
      return this.role == "admin";
   }
};