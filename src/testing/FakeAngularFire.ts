import { Category } from '../app/category';
import { QueryReference } from 'angularfire2/interfaces';

import { mockedCategoriesServer } from './FakeCategoryService';
import { mockedProductsServer } from './FakeProductService';
import { Observable } from 'rxjs/Observable';

export class FakeAngularFireAuth {
  auth = {
    signInWithEmailAndPassword(user: string, password: string): void {
    },
    signOut(): void {
    }
  };
  authState = null;
}

export class FakeAngularFireDatabase {
  list(url: string): Observable<any[]> {
    switch (url) {
      case '/categories':
        return new Observable(subscriber => subscriber.next(mockedCategoriesServer));

      case '/products':
        return new Observable(subscriber => subscriber.next(mockedProductsServer));

      default:
        return null;
    }
  }
}
