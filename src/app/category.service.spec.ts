import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'

import { FakeAngularFireAuth, FakeAngularFireDatabase } from '../testing/FakeAngularFire';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: AngularFireAuth, useClass: FakeAngularFireAuth },
        { provide: AngularFireDatabase, useClass: FakeAngularFireDatabase }
      ]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
