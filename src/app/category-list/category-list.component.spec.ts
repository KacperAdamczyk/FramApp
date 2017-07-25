import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';

import { CategoryService } from '../category.service';
import { FakeCategoryService, mockedCategories } from '../../testing/FakeCategoryService';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      providers: [
        {provide: CategoryService, useClass: FakeCategoryService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
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
      expect(fixture.debugElement.nativeElement.querySelectorAll('li').length).toEqual(value.length));
  });

  // it ('should all categories redirect to proper component', () => {
  //
  // })
});
