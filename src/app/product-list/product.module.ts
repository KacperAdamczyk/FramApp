import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductListRoutingModule } from './product-routing.module';

//import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@NgModule({
  imports: [
    CommonModule,
    ProductListRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  exports: [],
  providers: [
    //CategoryService,
    ProductService
  ]
})
export class ProductModule {
}
