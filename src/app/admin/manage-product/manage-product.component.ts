import { Component, OnInit } from '@angular/core';

import { Product } from '../../product';

import { ProductService } from '../../product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  onDelete(id: string): void {
    this.productService.deleteProduct(id);
  }

  onDeleteAll(): void {
    if (!window.confirm('Do you really want to delete everything?')) {
      return;
    }
    this.productService.deleteAllProducts();
  }
}
