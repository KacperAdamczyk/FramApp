import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoryComponent } from './add-edit-category.component';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../../../testing/router-stubs';

import { CategoryService } from '../../../category.service';
import { FakeCategoryService } from '../../../../testing/FakeCategoryService';
import { FormBuilder } from '@angular/forms';

describe('AddEditCategoryComponent', () => {
  let component: AddEditCategoryComponent;
  let fixture: ComponentFixture<AddEditCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCategoryComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: CategoryService, useClass: FakeCategoryService },
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
