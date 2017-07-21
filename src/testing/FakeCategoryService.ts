import { Observable } from 'rxjs/Observable';
import { Category } from '../app/category';

export class FakeCategoryService {
  getCategory(id: string): Observable<Category> {
    const category = new Category(id, 'Selected Category', 'Lorem ipsum dolor sit amet');
    return new Observable(observer => observer.next(category));
  }
  getCategories(): Observable<Category[]> {
    const categories = [
      new Category('1', 'Category 1', 'lorem'),
      new Category('2', 'Category 2', 'ipsum'),
      new Category('3', 'Category 3', 'dolor')
    ];
    return new Observable(observer => observer.next(categories));
  }
  getFirstCategory() {
    const firstCategory = new Category('0', 'First category', 'sit');
    return new Observable(observer => observer.next(firstCategory));
  }
  addCategory(category: Category) {
  }
  editCategory(category: Category) {
  }
  deleteCategory(categoryId: string) {
  }
  deleteAllCategories() {
  }
};
