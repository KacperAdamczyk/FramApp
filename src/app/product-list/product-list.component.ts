import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { ProductService } from '../product.service';

import { Product } from '../product';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() categoryToDisplay = '';
  products: Observable<Product[]>;
  detailedProduct: Product = null;
  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.products = this.productService.getProducts(this.categoryToDisplay);
  }
  ngOnChanges() {
    this.products = this.productService.getProducts(this.categoryToDisplay);
    this.detailedProduct = null;
  }
  showDetails(product: Product) {
    console.log(product);
    this.detailedProduct = product;
  }
}
