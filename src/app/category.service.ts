import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, filter, tap } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { CategoriesState } from './store/reducers/categories.reducer';
import { Category } from './category/models/category.interface';
import { QueryCategories } from './store/actions/categories.actions';
import {
  getAllCategories,
  getCurrentCategory,
  getFullCategoryName,
} from './store/selectors/categories.selectors';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  allCategories$: Observable<Category[]>;
  currentCategory$: Observable<Category>;

  constructor(
    private afs: AngularFirestore,
    private store: Store<CategoriesState>,
    private titleService: Title
  ) {
    this.allCategories$ = this.store.pipe(select(getAllCategories));
    this.currentCategory$ = this.store.pipe(
      select(getCurrentCategory),
      filter(Boolean),
      tap((category: Category) => this.titleService.setTitle(category.name))
    );
  }

  loadAllCategories(): void {
    this.store.dispatch(new QueryCategories());
  }

  queryCategories(): Observable<Category[]> {
    return this.afs
      .collection<Category>('categories')
      .snapshotChanges()
      .pipe(
        map((arr: DocumentChangeAction<Category>[]) => {
          return arr.map(doc => {
            const data = doc.payload.doc.data();
            return { id: doc.payload.doc.id, ...data };
          });
        })
      );
  }

  getFullCategoryName(slug: string): Observable<string> {
    return this.store.pipe(select(getFullCategoryName, { slug }));
  }
}
