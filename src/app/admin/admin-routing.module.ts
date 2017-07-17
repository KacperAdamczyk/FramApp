import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';

const adminRoutes: Routes = [
  { path: 'admin/categories', component: ManageCategoryComponent },
  { path: 'admin/products', component: ManageProductComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
