export class Vendor {
  name: string = "";
  id: number = 0;;
  type: string="";
  constructor(user?) {
    if (user) {
      this.name = user.name;
      this.id = user.id
      this.type = user.type;
    }
  }
};
