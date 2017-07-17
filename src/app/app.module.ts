import './global-imports';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { firebaseConfig } from './firebaseConfig';

import { AppComponent } from './app.component';

import { CategoryService } from './category.service';
import { ProductService } from './product.service'

import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserButtonDirective } from './user-button.directive';
import { ProductImageDirective } from './product-list/product-image.directive';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';

// import { ButtonsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ProductListComponent,
    UserButtonDirective,
    ProductImageDirective,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // ButtonsModule.forRoot()
  ],
  providers: [
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
