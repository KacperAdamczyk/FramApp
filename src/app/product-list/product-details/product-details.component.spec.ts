import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';

import { ActivatedRoute } from '@angular/router'
import { ActivatedRouteStub } from '../../../testing/router-stubs'

import { ProductService } from '../../product.service';
import { FakeProductService, mockedProducts } from '../../../testing/FakeProductService'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: ProductService, useClass: FakeProductService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get chosen product', () => {
    const selectedProduct = mockedProducts[Math.floor(Math.random() * (mockedProducts.length - 1))];
    activatedRoute.testParamMap = {id: selectedProduct.id_real};
    component.product$.subscribe(value => expect(value).toEqual(selectedProduct));
  });
});
