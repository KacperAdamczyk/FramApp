import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

import { UserAuthService } from '../user-auth.service';
import { FakeUserAuthService } from '../../testing/FakeUserAuthService';

import { ActivatedRoute, Router } from '@angular/router'
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';

import { CategoryService } from '../category.service';
import { FakeCategoryService, mockedCategories } from '../../testing/FakeCategoryService';

import { ProductService } from '../product.service';
import { FakeProductService, mockedProducts } from '../../testing/FakeProductService';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        {provide: UserAuthService, useClass: FakeUserAuthService},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
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

  it('should all displayed product be from the same category', fakeAsync(() => {
    const randomCategoryId = Math.floor(Math.random() * (mockedCategories.length - 1));
    const firstProductCategory = mockedCategories[randomCategoryId].title;
    activatedRoute.testParamMap = {category: firstProductCategory};
    component.products$.subscribe(products => products.forEach(product => expect(product.category).toEqual(firstProductCategory)))
  }));

  it('should display preview for every product', () => {
    component.products$.subscribe(value =>
      expect(fixture.debugElement.nativeElement.querySelectorAll('.pSquare').length).toBe(value.length));
  });
});
