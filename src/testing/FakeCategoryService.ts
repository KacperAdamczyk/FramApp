import { Observable } from 'rxjs/Observable';
import { Category } from '../app/category';

export const mockedCategories = [
  new Category('x', 'Category 1', 'lorem'),
  new Category('y', 'Category 2', 'ipsum'),
  new Category('z', 'Category 3', 'dolor')
];
export const mockedCategoriesServer = [
  {$key: 'x', title: 'Category 1', description: 'lorem'},
  {$key: 'y', title: 'Category 2', description: 'ipsum'},
  {$key: 'z', title: 'Category 3', description: 'dolor'},
];

export const mockedCategory = new Category('000', 'Selected Category', 'Lorem ipsum dolor sit amet');

export const mockedFirstCategory = new Category('0', 'First category', 'sit');

export class FakeCategoryService {
  getCategory(id: string): Observable<Category> {
    return new Observable(observer => observer.next(mockedCategory));
  }

  getCategories(): Observable<Category[]> {
    return new Observable(observer => observer.next(mockedCategories));
  }

  getFirstCategory() {
    return new Observable(observer => observer.next(mockedFirstCategory));
  }

  addCategory(category: Category) {
  }

  editCategory(category: Category) {
  }

  deleteCategory(categoryId: string) {
  }

  deleteAllCategories() {
  }
}
