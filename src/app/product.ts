export class Product {
  id_real: string;
  id: number;
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  promoted: boolean;
  price: number;
  amount: number;
  constructor(id_real = '',
              id = 0,
              title = '',
              description = '',
              category = '',
              imgUrl = '',
              promoted = false,
              price = 0,
              amount = 0) {
    this.id_real = id_real;
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.imgUrl = imgUrl;
    this.promoted = promoted;
    this.price = price;
    this.amount = amount;
  }
}
