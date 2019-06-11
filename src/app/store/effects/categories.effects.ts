import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Category } from '../../category/models/category.interface';
import { CategoryService } from '../../category.service';
import { queryCategories, addCategories } from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) {}

  queryCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(queryCategories),
      switchMap(() =>
        this.categoryService.queryCategories().pipe(
          map((categories: Category[]) => addCategories({ categories })),
          catchError(() => of(null))
        )
      )
    )
  );
}
