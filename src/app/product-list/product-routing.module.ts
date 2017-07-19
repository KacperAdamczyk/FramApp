import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const productListRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(productListRoutes)
  ],
  exports: [ RouterModule ]
})
export class ProductListRoutingModule { }
