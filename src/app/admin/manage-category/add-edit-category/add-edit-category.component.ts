import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import { Category } from '../../../category'
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../../../category.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup;
  formErrors = {
    title: '',
    description: ''
  };
  validationMessages = {
    title: {
      required: 'Title is required.',
    },
  };
  categorySubscription$: Subscription;
  category: Category;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.categorySubscription$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.categoryService.getCategory(id) : new Observable(subscriber => subscriber.next(new Category()));
    }).subscribe(category => {
      this.category = <Category>category;
      this.buildForm();
    });
  }
  ngOnDestroy() {
    this.categorySubscription$.unsubscribe();
  }
  buildForm(): void {
    this.categoryForm = this.fb.group({
      title: [this.category.title, Validators.required],
      description: [this.category.description]
    });
    this.categoryForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  // TODO fix this
  onValueChanged(data?: any) {
    if (!this.categoryForm) { return; }

    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) { continue; }
      this.formErrors[field] = '';
      const control = this.categoryForm.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (!control.errors.hasOwnProperty(field)) { continue; }
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  onAdd(): void {
    this.categoryService.addCategory(this.categoryForm.value);
    this.redirectToDefault();
  }
  onEdit(): void {
    const category = this.categoryForm.value;
    category.id = this.category.id;
    this.categoryService.editCategory(category);
    this.redirectToDefault();
  }
  onDelete(id: string): void {
    this.categoryService.deleteCategory(id);
    this.redirectToDefault();
  }
  private redirectToDefault(): void {
    this.router.navigateByUrl('admin/categories');
  }
}
