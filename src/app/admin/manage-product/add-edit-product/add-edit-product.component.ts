import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import { ProductService } from '../../../product.service';
import { CategoryService } from '../../../category.service';

import { Observable } from 'rxjs/Observable';
import { Product } from '../../../product';
import { Category } from '../../../category';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  product$: Observable<Product>;
  lastProductIdSubscription$: Subscription;
  product: Product;
  categories$: Observable<Category[]>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      return id ? this.productService.getProduct(id) : new Observable(subscriber => {
        this.product = new Product();
        subscriber.next(this.product);
      });
    });
    this.categories$ = this.categoryService.getCategories();
    this.lastProductIdSubscription$ = this.productService.getLastProductId().subscribe(productId => {
      const lastProductId = productId + 1;
      if (this.product) {
        this.product.id = lastProductId;
        this.product.imgUrl = `https://unsplash.it/320/180/?random&id=${lastProductId}`;
      }
    })
  }
  ngOnDestroy() {
    this.lastProductIdSubscription$.unsubscribe();
  }
  onAdd(product: Product) {
    this.productService.addProduct(product);
    this.redirectToDefault();
  }
  onEdit(product: Product) {
    this.productService.editProduct(product);
    this.redirectToDefault();
  }
  onDelete(id: string) {
    this.productService.deleteProduct(id);
    this.redirectToDefault();
  }
  private redirectToDefault() {
    this.router.navigateByUrl('admin/products');
  }
}
