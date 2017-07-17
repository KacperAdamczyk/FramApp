import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

import { ManageCategoryComponent } from './manage-category/manage-category.component';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductComponent } from './manage-product/manage-product.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    ManageCategoryComponent,
    ManageProductComponent
  ],
  providers: [
    CategoryService,
    ProductService
  ]
})
export class AdminModule { }
