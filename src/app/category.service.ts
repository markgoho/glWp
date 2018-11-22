import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { CategoriesState } from './store/reducers/categories.reducer';
import { Category } from './category/models/category.interface';
import { QueryCategories } from './store/actions/categories.actions';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$: Observable<Category[]>;

  constructor(private afs: AngularFirestore, private store: Store<CategoriesState>) {}

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
}
