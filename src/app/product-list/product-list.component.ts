import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

import { Product } from '../product';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  categoryNameSubscription$: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService) {
  }
  ngOnInit() {
    const categoryName$ = this.route.paramMap.map((params: ParamMap) => params.get('category'));

    this.categoryNameSubscription$ = categoryName$
      .filter(name => !name)
      .switchMap(() => this.categoryService.getFirstCategory())
      .subscribe(category => this.router.navigateByUrl(`products/${category}`));

    this.products$ = categoryName$
      .switchMap(name => this.productService.getProducts(name));
  }
  ngOnDestroy() {
    this.categoryNameSubscription$.unsubscribe();
  }
}
