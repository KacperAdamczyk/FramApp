import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductService } from '../product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  exports: [
    ProductListComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
