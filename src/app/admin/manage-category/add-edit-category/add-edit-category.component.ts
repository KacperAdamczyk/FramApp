import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Category } from '../../../category'

import { CategoryService } from '../../../category.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnDestroy {
  categoryForm$: Observable<FormGroup>;
  formValueChangesSubscription: Subscription;
  formErrors = {
    title: '',
    description: ''
  };
  validationMessages = {
    title: {
      required: 'Title is required.',
    }
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.categoryForm$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.categoryService.getCategory(id) : of(new Category());
    }).map(category => this.buildForm(category));
  }

  ngOnDestroy() {
    this.formValueChangesSubscription.unsubscribe();
  }

  buildForm(category: Category): FormGroup {
    const form = this.fb.group({
      id: [category.id],
      title: [category.title, Validators.required],
      description: [category.description]
    });

    this.formValueChangesSubscription = form.valueChanges.subscribe(data => this.onValueChanged(form));

    return form;
  }

  onValueChanged(form: FormGroup): void {
    if (!form) {
      return;
    }

    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (!control.errors.hasOwnProperty(key)) {
            continue;
          }
          this.formErrors[field] += messages[key] + ' ';
          console.log(this.formErrors);
        }
      }
    }
  }

  onAdd(form: FormGroup): void {
    this.categoryService.addCategory(form.getRawValue());
    this.redirectToDefault();
  }

  onEdit(form: FormGroup): void {
    const category = form.getRawValue();
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
