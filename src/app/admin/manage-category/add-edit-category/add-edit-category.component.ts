import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import { Category } from '../../../category'
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../../../category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  category$: Observable<Category>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.category$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      console.log(id);
      return id ? this.categoryService.getCategory(id) : new Observable(subscriber => subscriber.next([new Category()]));
    });
  }
  onAdd(category: Category) {
    this.categoryService.addCategory(category);
    this.redirectToDefault();
  }
  onEdit(category: Category) {
    this.categoryService.editCategory(category);
    this.redirectToDefault();
  }
  onDelete(id: string) {
    this.categoryService.deleteCategory(id);
    this.redirectToDefault();
  }
  private redirectToDefault() {
    this.router.navigateByUrl('admin/categories');
  }
}
