import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../category.service';
import {Observable} from 'rxjs/Observable';

import {Category} from '../../category';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  categories$: Observable<Category[]>;
  constructor(private categoryService: CategoryService) {}
  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }
  onDelete(id: string): void {
    this.categoryService.deleteCategory(id);
  }
  onDeleteAll(): void {
    if (!window.confirm('Do you really want to delete everything?')) {
      return;
    }
    this.categoryService.deleteAllCategories();
  }
}
