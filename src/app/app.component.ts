import {Component, OnDestroy} from '@angular/core';

import { CategoryService } from './category.service';

import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  categories: Category[];
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private categoryService: CategoryService) {
    categoryService.getCategories().subscribe(data => this.categories = data);
  }
}

