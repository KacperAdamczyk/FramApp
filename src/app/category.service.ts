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
  items: FirebaseListObservable<any[]>;
  msgVal = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.login();
    this.items = af.list('/categories');
    this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createCategory(category: Category) {
    this.items.push({ message: null});
    this.msgVal = '';
  }

  getCategories(): any {
    return this.items;
  }
}
