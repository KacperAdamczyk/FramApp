import 'rxjs/add/operator/first';

import { Injectable, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { email, password } from './firebaseConfig'

import { Product } from './product'


@Injectable()
export class ProductService implements OnDestroy {
  user$: Observable<firebase.User>;
  products$: FirebaseListObservable<Product[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.products$ = af.list('/products');
    this.user$ = this.afAuth.authState;
  }

  ngOnDestroy() {
    this.logout();
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getProducts(category: string = ''): Observable<Product[]> {
    // category = category ? category.toLocaleLowerCase() : ''; /* There's no need for letter case normalization */
    return this.products$.map(products => products
      .filter(product => category ? product.category === category : true)
      .map(product => new Product(product.$key, product.id, product.title, product.description, product.category,
        product.imgUrl, product.promoted, product.price, product.amount)));
  }

  getProduct(id: string): Observable<Product> {
    return this.products$.map(products => {
      const product = products.find(p => p.$key === id);
      return new Product(
        product.$key, product.id, product.title, product.description, product.category,
        product.imgUrl, product.promoted, product.price, product.amount);
    });
  }

  getLastProductId(): Observable<number> {
    return this.products$.map(products => Math.max(-1, ...products.map(p => p.id)));
  }

  addProduct(product: Product) {
    delete product.id_real;
    this.products$.push(product);
  }

  editProduct(product: Product) {
    const productId = product.id_real;
    delete product.id_real;
    this.products$.update(productId, product);
  }

  deleteProduct(productId: string) {
    if (!productId) {
      return;
    }
    this.products$.remove(productId);
  }

  deleteAllProducts() {
    this.products$.remove();
  }
}
