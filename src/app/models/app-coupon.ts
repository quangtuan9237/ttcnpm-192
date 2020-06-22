export class AppCoupon {
  name: string = "";
  description: string = "";
  level: string = "";
  constructor(user?) {
    if (user) {
      this.name = user.name;
      this.description = user.description;
      this.level = user.level;
    }
  }
};
