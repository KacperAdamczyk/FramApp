import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { email, password } from './firebaseConfig'

import { Product } from './product'

@Injectable()
export class ProductService {
  user: Observable<firebase.User>;
  items$: FirebaseListObservable<Product[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.items$ = af.list('/products');
    this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  getProducts(category: String): Observable<Product[]> {
    category = category.toLocaleLowerCase();
    return this.items$.map(products => products
      .filter(product => product.category === category)
      .map(product => new Product(product.$key, product.id, product.title, product.description, product.category,
          product.imgUrl, product.promoted, product.price, product.amount))
    );
  }
  addProduct(product: Product) {
    this.items$.push(JSON.stringify(product));
  }
}
