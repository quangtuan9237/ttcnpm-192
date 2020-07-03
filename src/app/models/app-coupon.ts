export class AppCoupon {
  id: string="";
  name: string = "";
  description: string = "";
  level: string = "";
  constructor(user?) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.description = user.description;
      this.level = user.level;
    }
  }
};
