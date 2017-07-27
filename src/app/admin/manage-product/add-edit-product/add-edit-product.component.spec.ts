import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './add-edit-product.component';

import { ActivatedRoute, Router } from '@angular/router';

import { ActivatedRouteStub, RouterStub } from '../../../../testing/router-stubs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ProductService } from '../../../product.service'
import { FakeProductService, mockedProducts } from '../../../../testing/FakeProductService'

import { CategoryService } from '../../../category.service'
import { FakeCategoryService } from '../../../../testing/FakeCategoryService'

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;
  let fakeProductService: FakeProductService;

  beforeEach(async(() => {
    fakeProductService = new FakeProductService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddEditProductComponent],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: ProductService, useValue: fakeProductService},
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

  it('should delete button send proper parameter', () => {
    spyOn(component, 'onDelete');
    const productToSet = mockedProducts[Math.floor(Math.random() * (mockedProducts.length - 1))];
    component.productForm.setValue(productToSet);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons.forEach(b => {
      if (b.innerText === 'Delete') {
        b.click();
        expect(component.onDelete).toHaveBeenCalledWith(productToSet.id_real);
      }
    });
  });

  fit('submitted form should return proper values', () => {
    const productToSet = mockedProducts[Math.floor(Math.random() * (mockedProducts.length - 1))];
    component.productForm.setValue(productToSet);
    spyOn(fakeProductService, 'editProduct');

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('form button');
    submitButton.click();
    expect(fakeProductService.editProduct).toHaveBeenCalled();
  });
});
