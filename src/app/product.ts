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
              id = null,
              title = '',
              description = '',
              category = '',
              imgUrl = `https://unsplash.it/320/180/?random&id=${id}`,
              promoted = false,
              price = null,
              amount = null) {
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
