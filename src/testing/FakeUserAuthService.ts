import { Observable } from 'rxjs/Observable';

export class FakeUserAuthService {
  isUserAuth(): Observable<boolean> {
    return new Observable(observer => observer.next(true));
  }
}
