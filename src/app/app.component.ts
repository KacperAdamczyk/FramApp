import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

import { CoolSessionStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'FramApp';
  userLoggedIn = false;
  firstCategory$: Observable<any>;
  userLoggedInLabel = 'Log Out';
  userLoggedOutLabel = 'Log In';
  userStorageLabel = 'userLoggedIn';
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private categoryService: CategoryService,
              private coolSessionStorage: CoolSessionStorage,
              private router: Router) {
    this.firstCategory$ = categoryService.getFirstCategory();
    if (!this.coolSessionStorage.getItem(this.userStorageLabel)) {
      this.coolSessionStorage.setItem(this.userStorageLabel, String(false));
    }
    this.userLoggedIn = this.coolSessionStorage.getItem(this.userStorageLabel) === String(true);
  }
  onUserButtonClick() {
    this.userLoggedIn = !this.userLoggedIn;
    this.coolSessionStorage.setItem(this.userStorageLabel, String(this.userLoggedIn));
    if (!this.userLoggedIn) { this.redirectToDefault(); }
  }
  redirectToDefault() {
    const regExp = /^[/]admin[/].*/;
    if (regExp.test(this.router.url)) {
      this.router.navigateByUrl('');
    }
  }
}

