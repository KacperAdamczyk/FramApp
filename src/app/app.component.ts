import {Component, OnDestroy} from '@angular/core';

import {CategoryService}      from './category.service';
import {Observable}           from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'FramApp';
  userLoggedIn = false;
  userStatus = 'user';
  categoryToDisplay = '';
  firstCategory: Observable<any>;
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private categoryService: CategoryService) {
    this.firstCategory = categoryService.getFirstCategory();

    if (!window.sessionStorage.getItem(this.userStatus)) {
      window.sessionStorage.setItem(this.userStatus, this.userLoggedIn ? 'true' : 'false');
    }
    this.userLoggedIn = window.sessionStorage.getItem(this.userStatus) === 'true';
  }
  onUserButtonClick() {
    this.userLoggedIn = !this.userLoggedIn;
  }
  onCategoryClick(e: MouseEvent) {
    if (e.toElement.tagName !== 'A') {
      return;
    }
    this.categoryToDisplay = e.toElement.innerHTML;
  }
}

