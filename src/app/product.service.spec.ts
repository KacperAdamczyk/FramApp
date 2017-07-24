import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FakeAngularFireAuth, FakeAngularFireDatabase } from '../testing/FakeAngularFire';
import { mockedCategories } from 'testing/FakeCategoryService';
import { mockedProducts } from 'testing/FakeProductService';
import { forEach } from '@angular/router/src/utils/collection';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {provide: AngularFireAuth, useClass: FakeAngularFireAuth},
        {provide: AngularFireDatabase, useClass: FakeAngularFireDatabase}
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should return all product in certain, randomly chosen category', inject([ProductService], (service: ProductService) => {
    const chosenCategory = mockedCategories[Math.floor(Math.random() * (mockedCategories.length - 1))].title;
    service.getProducts(chosenCategory).subscribe(value => value.forEach(v => expect(v.category).toEqual(chosenCategory)));
  }));

  it('should return all products', inject([ProductService], (service: ProductService) => {
    service.getProducts().subscribe(value => expect(value.length).toEqual(mockedProducts.length));
  }));

  it('should return specified product', inject([ProductService], (service: ProductService) => {
    const chosenProduct = mockedProducts[Math.floor(Math.random() * (mockedProducts.length - 1))];
    service.getProduct(chosenProduct.id_real).subscribe(value => expect(value).toEqual(chosenProduct));
  }));

  it('should return last product id', inject([ProductService], (service: ProductService) => {
    service.getLastProductId().subscribe(value => expect(value).toEqual(mockedProducts[mockedProducts.length - 1].id));
  }));
});
