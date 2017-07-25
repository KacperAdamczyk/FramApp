import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Category } from '../../../category'

import { CategoryService } from '../../../category.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';

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
    }
  };
  categorySubscription$: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.categorySubscription$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.categoryService.getCategory(id) : of(new Category());
    }).subscribe(category => this.buildForm(category));
  }

  ngOnDestroy() {
    this.categorySubscription$.unsubscribe();
  }

  buildForm(category): void {
    this.categoryForm = this.fb.group({
      id: [category.id],
      title: [category.title, Validators.required],
      description: [category.description]
    });
    this.categoryForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  onValueChanged(): void {
    if (!this.categoryForm) {
      return;
    }

    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = '';
      const control = this.categoryForm.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (!control.errors.hasOwnProperty(key)) {
            continue;
          }
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onAdd(): void {
    console.log('add');
    this.categoryService.addCategory(this.categoryForm.getRawValue());
    this.redirectToDefault();
  }

  onEdit(): void {
    console.log('eidt');
    const category = this.categoryForm.getRawValue();
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
