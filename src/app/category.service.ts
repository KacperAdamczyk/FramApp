import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { email, password } from './firebaseConfig'

import { Category } from './category'

@Injectable()
export class CategoryService {
  user: Observable<firebase.User>;
  items$: FirebaseListObservable<Category[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.items$ = af.list('/categories');
    this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  getCategories(): Observable<Category[]> {
    return this.items$.map(categories =>
      categories.map(category => new Category(category.$key, category.title, category.description)));
  }
  addCategory(category: Category) {
    this.items$.push(category);
  }
  getFirstCategory() {
    return this.items$.map(categories => categories.filter((val, i) => i === 0).map(category => category.title));
  }
}
