import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '../admin-auth.guard';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddEditCategoryComponent } from './manage-category/add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './manage-product/add-edit-product/add-edit-product.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [ AdminAuthGuard ],
    children: [
      { path: 'categories', component: ManageCategoryComponent },
      { path: 'products', component: ManageProductComponent },
      { path: 'category', component: AddEditCategoryComponent },
      { path: 'category/:id', component: AddEditCategoryComponent },
      { path: 'product', component: AddEditProductComponent },
      { path: 'product/:id', component: AddEditProductComponent },
      { path: '', redirectTo: '/products', pathMatch: 'full' }
      ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
