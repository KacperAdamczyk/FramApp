import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoryComponent } from './add-edit-category.component';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../../../testing/router-stubs';

import { CategoryService } from '../../../category.service';
import { FakeCategoryService, mockedCategories } from '../../../../testing/FakeCategoryService';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AddEditCategoryComponent', () => {
  let component: AddEditCategoryComponent;
  let fixture: ComponentFixture<AddEditCategoryComponent>;
  let fakeCategoryService: FakeCategoryService;

  beforeEach(async(() => {
    fakeCategoryService = new FakeCategoryService();

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [AddEditCategoryComponent],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: CategoryService, useValue: fakeCategoryService},
        FormBuilder
      ],
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

  it('should delete button send proper parameter', () => {
    spyOn(component, 'onDelete');
    const categoryToSet = mockedCategories[Math.floor(Math.random() * (mockedCategories.length - 1))];
    component.categoryForm.setValue(categoryToSet);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons.forEach(b => {
      if (b.innerText === 'Delete') {
        b.click();
        expect(component.onDelete).toHaveBeenCalledWith(categoryToSet.id);
      }
    });
  });

  it('submitted form should return proper values', () => {
    const categoryToSet = mockedCategories[Math.floor(Math.random() * (mockedCategories.length - 1))];
    component.categoryForm.setValue(categoryToSet);
    spyOn(fakeCategoryService, 'editCategory');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelector('form button');
    submitButton.click();
    expect(fakeCategoryService.editCategory).toHaveBeenCalled();
  });
});
