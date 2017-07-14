import { Component } from '@angular/core';

import { CategoryService } from './category.service';

import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  categories: any;
  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
  }
}
