import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoolSessionStorage } from 'angular2-cool-storage'

@Injectable()
export class UserAuthService {
  userStorageLabel = 'userLoggedIn';

  constructor(private coolSessionStorage: CoolSessionStorage) {
  }

  isUserAuth(): Observable<boolean> {
    return new Observable(observer => observer.next(this.coolSessionStorage.getItem(this.userStorageLabel) === String(true)));
  }
}
