import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddEditCategoryComponent } from './manage-category/add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './manage-product/add-edit-product/add-edit-product.component';

const adminRoutes: Routes = [
  { path: 'admin/categories', component: ManageCategoryComponent },
  { path: 'admin/products', component: ManageProductComponent },
  { path: 'admin/category', component: AddEditCategoryComponent },
  { path: 'admin/category/:id', component: AddEditCategoryComponent },
  { path: 'admin/product', component: AddEditProductComponent },
  { path: 'admin/product/:id', component: AddEditProductComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
