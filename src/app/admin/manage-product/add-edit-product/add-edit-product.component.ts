import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import { ProductService } from '../../../product.service';
import { CategoryService } from '../../../category.service';

import { Category } from '../../../category';
import { Product } from '../../../product';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  };
  productSubscription$: Subscription;
  lastProductIdSubscription$: Subscription;
  product: Product;
  categories$: Observable<Category[]>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.productSubscription$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.productService.getProduct(id) : new Observable(subscriber => subscriber.next(new Product()));
    }).subscribe(product => {
      this.product = <Product>product;
      this.buildForm();
    });
    this.categories$ = this.categoryService.getCategories();
    this.lastProductIdSubscription$ = this.productService.getLastProductId().subscribe(productId => {
      const lastProductId = productId + 1;
      if (this.product) {
        this.product.id = lastProductId;
        this.product.imgUrl = `https://unsplash.it/320/180/?random&id=${lastProductId}`;
      }
      if (this.productForm) {
        this.productForm.patchValue({ imgUrl: this.product.imgUrl });
      }
    });
  }
  ngOnDestroy() {
    this.productSubscription$.unsubscribe();
    this.lastProductIdSubscription$.unsubscribe();
  }
  buildForm(): void {
    this.productForm = this.fb.group({
      title: [ this.product.title, Validators.required ],
      promoted: [ this.product.promoted ],
      price: [ this.product.price ],
      amount: [ this.product.amount ],
      imgUrl: [ this.product.imgUrl, Validators.required ],
      category: [ this.product.category, Validators.required ],
      description: [ this.product.description ]
    });
  }
  onAdd(): void {
    const product = this.productForm.value;
    product.id = this.product.id;
    this.productService.addProduct(product);
    this.redirectToDefault();
  }
  onEdit(): void {
    const product = this.productForm.value;
    product.id = this.product.id;
    product.id_real = this.product.id_real;
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
