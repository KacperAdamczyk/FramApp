import { Observable } from 'rxjs/Observable';
import { Product } from '../app/product';

export class FakeProductService {
  private products = [
    new Product('', 0, 'Product #1'),
    new Product('', 1, 'Product #2'),
    new Product('', 2, 'Product #3'),
    new Product('', 3, 'Product #4'),
    new Product('', 4, 'Product #5'),
  ];

  getProducts(category: string = ''): Observable<Product[]> {
    return new Observable(observer => observer.next(this.products));
  }

  getProduct(id: string): Observable<Product> {
    return new Observable(observer => observer.next(new Product(id, 666, 'Selected product')));
  }

  getLastProductId(): Observable<number> {
    const id = 123;
    return new Observable(observer => observer.next(id));
  }

  addProduct(product: Product) {
  }

  editProduct(product: Product) {
  }

  deleteProduct(productId: string) {
  }

  deleteAllProducts() {
  }
}
