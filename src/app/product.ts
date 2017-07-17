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
  constructor(id_real: string, id: number, title: string, description: string, category: string, imgUrl: string,
              promoted: boolean, price: number, amount: number) {
    this.id_real = id_real;
    this.id = id;
    this.title = this.validateString(title);
    this.description = this.validateString(description);
    this.category = this.validateString(category);
    this.imgUrl = imgUrl ? imgUrl : `https://unsplash.it/320/180/?random&id=${id}`;
    this.promoted = promoted;
    this.price = this.validateNumber(price);
    this.amount = this.validateNumber(amount);
  }
  validateString(str: string): string {
    return str || '';
  }
  validateNumber(num: number): number {
    return num || 0;
  }
}
