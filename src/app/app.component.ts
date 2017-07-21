import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

import { CoolSessionStorage } from 'angular2-cool-storage';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'FramApp';
  userLoggedIn = false;
  firstCategory$: Observable<Category>;
  userLoggedInLabel = 'Log Out';
  userLoggedOutLabel = 'Log In';
  userStorageLabel = 'userLoggedIn';
  constructor(private categoryService: CategoryService,
              private coolSessionStorage: CoolSessionStorage,
              private router: Router) {
    this.firstCategory$ = categoryService.getFirstCategory();
  }

  ngOnInit() {
    if (!this.coolSessionStorage.getItem(this.userStorageLabel)) {
      this.coolSessionStorage.setItem(this.userStorageLabel, String(false));
    }
    this.userLoggedIn = this.coolSessionStorage.getItem(this.userStorageLabel) === String(true);
  }

  onUserButtonClick(): void {
    this.userLoggedIn = !this.userLoggedIn;
    this.coolSessionStorage.setItem(this.userStorageLabel, String(this.userLoggedIn));
    if (!this.userLoggedIn) { this.redirectToDefault(); }
  }
  redirectToDefault(): void {
    if (/^[/]admin[/].*/.test(this.router.url)) {
      this.router.navigateByUrl('');
    }
  }
}

