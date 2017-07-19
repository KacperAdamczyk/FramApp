import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductService } from '../../product.service'

import { Product } from '../../product'

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }
  ngOnInit() {
    const paramName = 'id';
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) => this.productService.getProduct(params.get(paramName)));
  }
}
