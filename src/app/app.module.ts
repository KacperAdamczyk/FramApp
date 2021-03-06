import './global-imports';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebaseConfig';

import { CoolStorageModule } from 'angular2-cool-storage';

import { ProductModule } from './product-list/product.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module'

import { CategoryService } from './category.service';
import { ProductService } from './product.service'
import { UserAuthService } from './user-auth.service'

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AdminPanelComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProductModule,
    AdminModule,
    CoolStorageModule,
    AppRoutingModule
  ],
  providers: [
    CategoryService,
    ProductService,
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
