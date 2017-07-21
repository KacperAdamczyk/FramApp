import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FakeAngularFireAuth, FakeAngularFireDatabase } from '../testing/FakeAngularFire';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: AngularFireAuth, useClass: FakeAngularFireAuth },
        { provide: AngularFireDatabase, useClass: FakeAngularFireDatabase }
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
