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
  products$: FirebaseListObservable<Product[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.products$ = af.list('/products');
    this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  getProducts(category: string = ''): Observable<Product[]> {
    category = category.toLocaleLowerCase();
    return this.products$.map(products => products
      .filter(product => category ? product.category === category : true)
      .map(product => new Product(product.$key, product.id, product.title, product.description, product.category,
          product.imgUrl, product.promoted, product.price, product.amount)));
  }
  getProduct(id: string) {
    return this.products$.map(products => products
      .filter(product => product.$key === id)
      .map(product => new Product(product.$key, product.id, product.title, product.description, product.category,
        product.imgUrl, product.promoted, product.price, product.amount)));
  }
  addProduct(product: Product) {
    this.products$.push(JSON.stringify(product));
  }
  deleteProduct(productId: string) {
    this.products$.remove(productId);
  }
  deleteAllProducts() {
    this.products$.remove();
  }
}
