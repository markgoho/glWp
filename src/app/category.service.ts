import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Category } from './category/models/category.interface';
import { CategoriesState } from './store/reducers/categories.reducer';
import { Store } from '@ngrx/store';
import { LoadCategoriesSuccess } from './store/actions/categories.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$: Observable<Category[]>;

  constructor(private db: AngularFirestore, private store: Store<CategoriesState>) {
    this.categories$ = this.db
      .collection<Category>('categories')
      .valueChanges()
      .pipe(
        tap((categories: Category[]) => this.store.dispatch(new LoadCategoriesSuccess(categories)))
      );
  }
}
