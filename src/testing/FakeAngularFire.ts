import { FirebaseListObservable } from 'angularfire2/database';

export class FakeAngularFireAuth {
  auth = {
    signInWithEmailAndPassword(user: string, password: string): void { },
    signOut(): void { }
  }
  authState = null;
}

export class FakeAngularFireDatabase {
  list(url: string): any {
    return null;
  }
}
