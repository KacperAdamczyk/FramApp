import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductComponent } from './manage-product.component';

import { ProductService } from '../../product.service';
import { FakeProductService } from '../../../testing/FakeProductService';

describe('ManageProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductComponent],
      providers: [
        {provide: ProductService, useClass: FakeProductService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
