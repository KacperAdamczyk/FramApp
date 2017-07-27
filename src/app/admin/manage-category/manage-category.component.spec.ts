import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryComponent } from './manage-category.component';

import { CategoryService } from '../../category.service';
import { FakeCategoryService, mockedCategories } from '../../../testing/FakeCategoryService';

describe('ManageCategoryComponent', () => {
  let component: ManageCategoryComponent;
  let fixture: ComponentFixture<ManageCategoryComponent>;
  let fakeCategoryService: FakeCategoryService;

  beforeEach(async(() => {
    fakeCategoryService = new FakeCategoryService();
    TestBed.configureTestingModule({
      declarations: [ManageCategoryComponent],
      providers: [
        {provide: CategoryService, useValue: fakeCategoryService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all categories', () => {
    component.categories$.subscribe(value => expect(value).toEqual(mockedCategories));
  });

  it('should display all categories', () => {
    component.categories$.subscribe(value =>
      expect(fixture.debugElement.nativeElement.querySelectorAll('table tbody tr').length).toEqual(value.length))
  });

  it('all delete buttons should receive proper parameter', () => {
    spyOn(fakeCategoryService, 'deleteCategory');
    let categoryIndex = 0;
    fixture.debugElement.nativeElement.querySelectorAll('a').forEach(b => {
      if (b.textContent === 'Delete') {
        b.click();
        expect(fakeCategoryService.deleteCategory).toHaveBeenCalledWith(mockedCategories[categoryIndex++].id);
      }
    });
  });
});
