import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';

import { ActivatedRoute } from '@angular/router'
import { ActivatedRouteStub } from '../../../testing/router-stubs'

import { ProductService } from '../../product.service';
import { FakeProductService } from '../../../testing/FakeProductService'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ProductService, useClass: FakeProductService }
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
});
