import './global-imports';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { firebaseConfig } from './firebaseConfig';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { CategoryService } from './category.service';
import { ProductService } from './product.service'

import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

// import { ButtonsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
    // ButtonsModule.forRoot()
  ],
  providers: [
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
