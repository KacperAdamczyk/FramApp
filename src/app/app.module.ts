import './global-imports';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { firebaseConfig } from './firebaseConfig';

import { ProductModule } from './product-list/product.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module'

import { CategoryService } from './category.service';
import { ProductService } from './product.service'

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
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProductModule,
    AdminModule,
    AppRoutingModule
  ],
providers: [
    CategoryService,
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
