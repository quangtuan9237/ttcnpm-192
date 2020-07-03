
export class AppProduct {
  key: string = "";
  title: string = "";
  price: number = 0;
  type: string = "";
  category: string = "";
  imageUrl: string = "";

  constructor(key, product) {
    this.key = key;
    this.title = product.title;
    this.price = product.price;
    this.type = product.type;
    this.category = product.category;
    this.imageUrl = product.imageUrl;
  }
};
