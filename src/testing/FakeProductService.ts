import { Observable } from 'rxjs/Observable';
import { Product } from '../app/product';

export const mockedProducts = [
  new Product('a', 0, 'Product #1', '', 'Category 1', 'url 1'),
  new Product('b', 1, 'Product #2', '', 'Category 2', 'url 2'),
  new Product('c', 2, 'Product #3', '', 'Category 1', 'url 3'),
  new Product('d', 3, 'Product #4', '', 'Category 3', 'url 4'),
  new Product('e', 4, 'Product #5', '', 'Category 1', 'url 5'),
];
export const mockedProductsServer = [
  {$key: 'a', id: 0, title: 'Product #1', category: 'Category 1'},
  {$key: 'b', id: 1, title: 'Product #2', category: 'Category 2'},
  {$key: 'c', id: 2, title: 'Product #3', category: 'Category 1'},
  {$key: 'd', id: 3, title: 'Product #4', category: 'Category 3'},
  {$key: 'e', id: 4, title: 'Product #5', category: 'Category 1'},
];

export class FakeProductService {
  getProducts(category: string = ''): Observable<Product[]> {
    if (!category) {
      return new Observable(subscriber => subscriber.next(mockedProducts));
    }
    const products = [];
    mockedProducts.forEach(product => {
      if (product.category === category) {
        products.push(product);
      }
    });
    return new Observable(subscriber => subscriber.next(products));
  }

  getProduct(id: string): Observable<Product> {
    let product;
    mockedProducts.forEach(p => {
      if (p.id_real === id) {
        product = p;
      }
    });
    return new Observable(subscriber => subscriber.next(product));
  }

  getLastProductId(): Observable<number> {
    return new Observable(subscriber => subscriber.next(mockedProducts[mockedProducts.length - 1].id));
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
