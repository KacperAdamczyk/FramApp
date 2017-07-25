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

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
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
  productSubscription$: Subscription;
  lastProductIdSubscription$: Subscription;
  categories$: Observable<Category[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.productSubscription$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.productService.getProduct(id) : of(new Product());
    }).subscribe(product => this.buildForm(product));
    this.categories$ = this.categoryService.getCategories();
    this.lastProductIdSubscription$ = this.productService.getLastProductId().subscribe(productId => {
      const lastProductId = productId + 1;
      if (this.productForm && this.productForm.get('id_real')) {
        this.productForm.patchValue({id: lastProductId});
        this.productForm.patchValue({imgUrl: `https://unsplash.it/320/180/?random&id=${lastProductId}`});
      }
    });
  }

  ngOnDestroy() {
    this.productSubscription$.unsubscribe();
    this.lastProductIdSubscription$.unsubscribe();
  }

  buildForm(product): void {
    this.productForm = this.fb.group({
      id: [product.id],
      id_real: [product.id_real],
      title: [product.title, Validators.required],
      promoted: [product.promoted],
      price: [product.price],
      amount: [product.amount],
      imgUrl: [product.imgUrl, Validators.required],
      category: [product.category, Validators.required],
      description: [product.description]
    });
    this.productForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  onValueChanged(): void {
    if (!this.productForm) {
      return;
    }

    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = '';
      const control = this.productForm.get(field);

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
    console.log('add call');
    const product = this.productForm.value;
    this.productService.addProduct(product);
    this.redirectToDefault();
  }

  onEdit(): void {
    console.log('edit call');
    const product = this.productForm.value;
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
