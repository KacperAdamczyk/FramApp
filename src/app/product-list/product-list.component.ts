import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { CategoryService } from '../category.service';

import { Product } from '../product';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(private route: ActivatedRoute,
              //private categoryService: CategoryService,
              private productService: ProductService) {
  }
  ngOnInit() {
    const paramName = 'category';
    this.products$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramVal = params.get(paramName);
      return this.productService.getProducts(paramVal); // : this.categoryService.getFirstCategory().map(category => this.productService.getProducts(category));
    });
  }
}
