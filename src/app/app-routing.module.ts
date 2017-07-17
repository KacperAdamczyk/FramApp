import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { AppComponent } from './app.component'

const appRoutes: Routes = [
  { path: 'products$', component: ProductListComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true } )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
