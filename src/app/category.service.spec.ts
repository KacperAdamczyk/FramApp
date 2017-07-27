import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'

import { FakeAngularFireAuth, FakeAngularFireDatabase } from '../testing/FakeAngularFire';

import { mockedCategories, mockedCategoriesServer } from '../testing/FakeCategoryService'

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        {provide: AngularFireAuth, useClass: FakeAngularFireAuth},
        {provide: AngularFireDatabase, useClass: FakeAngularFireDatabase}
      ]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should return categories', inject([CategoryService], (service: CategoryService) => {
    service.getCategories().subscribe(value => expect(value).toEqual(mockedCategories))
  }));

  it('should return randomly chosen category', inject([CategoryService], (service: CategoryService) => {
    const id = Math.round((Math.random() * (mockedCategoriesServer.length  - 1)));
    service.getCategory(mockedCategoriesServer[id].$key).subscribe(value => expect(value).toEqual(mockedCategories[id]));
  }));

  it('should return first category', inject([CategoryService], (service: CategoryService) => {
    service.getFirstCategory().subscribe(value => expect(value).toEqual(mockedCategories[0].title));
  }));
});
