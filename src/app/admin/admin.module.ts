import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddEditCategoryComponent } from './manage-category/add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './manage-product/add-edit-product/add-edit-product.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    ManageCategoryComponent,
    ManageProductComponent,
    AddEditCategoryComponent,
    AddEditProductComponent
  ],
  providers: [
    CategoryService,
    ProductService
  ]
})
export class AdminModule { }
