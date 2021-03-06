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
  categories$: FirebaseListObservable<Category[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.categories$ = af.list('/categories');
    this.user = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getCategory(id: string) {
    return this.categories$.map(categories => {
      const category = categories.find(c => c.$key === id);
      return new Category(category.$key, category.title, category.description);
    })
  }

  getCategories(): Observable<Category[]> {
    return this.categories$.map(categories =>
      categories.map(category => new Category(category.$key, category.title, category.description)));
  }

  getFirstCategory() {
    return this.categories$.map(categories => categories[0].title);
  }

  addCategory(category: Category) {
    delete category.id;
    this.categories$.push(category);
  }

  editCategory(category: Category) {
    const categoryId = category.id;
    delete category.id;
    this.categories$.update(categoryId, category);
  }

  deleteCategory(categoryId: string) {
    if (!categoryId) {
      return;
    }
    this.categories$.remove(categoryId);
  }

  deleteAllCategories() {
    this.categories$.remove();
  }
}
