import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import { ProductService } from '../../../product.service';
import { CategoryService } from '../../../category.service';

import {Observable} from 'rxjs/Observable';
import { Product } from '../../../product';
import { Category } from '../../../category';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  product$: Observable<Product>;
  categories$: Observable<Category[]>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const paramName = 'id';
      const id = params.get(paramName);
      console.log(id);
      return id ? this.productService.getProduct(id) : new Observable(subscriber => subscriber.next([new Product()]));
    });
    this.categories$ = this.categoryService.getCategories();
  }
  onAdd(product: Product) {
    this.productService.addProduct(product);
    this.redirectToDefault();
  }
  onEdit(product: Product) {
    this.productService.editProduct(product);
    this.redirectToDefault();
  }
  onDelete(id: string) {
    this.productService.deleteProduct(id);
    this.redirectToDefault();
  }
  private redirectToDefault() {
    this.router.navigateByUrl('admin/products');
  }
}
