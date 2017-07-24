import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

import { UserAuthService } from '../user-auth.service';
import { FakeUserAuthService } from '../../testing/FakeUserAuthService';

import { ActivatedRoute, Router } from '@angular/router'
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';

import { CategoryService } from '../category.service';
import { FakeCategoryService } from '../../testing/FakeCategoryService';

import { ProductService } from '../product.service';
import { FakeProductService } from '../../testing/FakeProductService';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        {provide: UserAuthService, useClass: FakeUserAuthService},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: CategoryService, useClass: FakeCategoryService},
        {provide: ProductService, useClass: FakeProductService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
