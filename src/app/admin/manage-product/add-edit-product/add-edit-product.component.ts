import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ProductService } from '../../../product.service';
import { CategoryService } from '../../../category.service';

import { Category } from '../../../category';
import { Product } from '../../../product';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productForm$: Observable<FormGroup>;
  categories$: Observable<Category[]>;
  lastProductId$: Observable<number>;

  formErrors = {
    title: '',
    price: '',
    amount: '',
    imgUrl: '',
    category: '',
    description: ''
  };
  validationMessages = {
    title: {
      required: 'Title is required.',
    },
    promoted: {},
    price: {
      required: 'Price is required.',
    },
    amount: {},
    imgUrl: {
      required: 'Image url is required.',
    },
    category: {
      required: 'Category is required.',
    },
    description: {}
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const lastProductId$ = this.productService.getLastProductId().map(x => x + 1);

    const product$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.productService.getProduct(id) : of(new Product());
    });

    this.productForm$ = combineLatest(product$, lastProductId$)
      .map(([product, lastId]) => this.buildForm(product, lastId))

    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy() {
    // this.lastProductIdSubscription$.unsubscribe();
  }

  buildForm(product: Product, lastId: number): FormGroup {
    const form = this.fb.group({
      id: [lastId],
      id_real: [product.id_real],
      title: [product.title, Validators.required],
      promoted: [product.promoted],
      price: [product.price],
      amount: [product.amount],
      imgUrl: [`https://unsplash.it/320/180/?random&id=${lastId}`, Validators.required],
      category: [product.category, Validators.required],
      description: [product.description]
    });

    form.valueChanges.subscribe(data => this.onValueChanged(form));

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
        }
      }
    }
  }

  onAdd(form: FormGroup): void {
    const product = form.value;
    this.productService.addProduct(product);
    this.redirectToDefault();
  }

  onEdit(form: FormGroup): void {
    const product = form.value;
    this.productService.editProduct(product);
    this.redirectToDefault();
  }

  onDelete(id: string): void {
    this.productService.deleteProduct(id);
    this.redirectToDefault();
  }

  private redirectToDefault(): void {
    this.router.navigateByUrl('admin/products');
  }
}
