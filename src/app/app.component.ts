import {Component, OnDestroy} from '@angular/core';

import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'FramApp';
  userLoggedIn = false;
  categoryToDisplay = '';
  firstCategory$: Observable<any>;
  userLoggedInLabel = 'Log Out';
  userLoggedOutLabel = 'Log In';
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private categoryService: CategoryService) {
    this.firstCategory$ = categoryService.getFirstCategory();
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

