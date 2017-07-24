import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './add-edit-product.component';

import { ActivatedRoute, Router } from '@angular/router';

import { ActivatedRouteStub, RouterStub } from '../../../../testing/router-stubs';
import { FormBuilder } from '@angular/forms';

import { ProductService } from '../../../product.service'
import { FakeProductService } from '../../../../testing/FakeProductService'

import { CategoryService } from '../../../category.service'
import { FakeCategoryService } from '../../../../testing/FakeCategoryService'

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProductComponent],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: ProductService, useClass: FakeProductService},
        {provide: CategoryService, useClass: FakeCategoryService},
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
