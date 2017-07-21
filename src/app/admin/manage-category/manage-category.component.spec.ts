import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryComponent } from './manage-category.component';

import { CategoryService } from '../../category.service';
import { FakeCategoryService } from '../../../testing/FakeCategoryService';

describe('ManageCategoryComponent', () => {
  let component: ManageCategoryComponent;
  let fixture: ComponentFixture<ManageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoryComponent ],
      providers: [
        { provide: CategoryService, useClass: FakeCategoryService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
});
