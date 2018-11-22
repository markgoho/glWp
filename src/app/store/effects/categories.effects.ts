import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CategoriesActionTypes, AddAllCategories } from '../actions/categories.actions';
import { Category } from '../../category/models/category.interface';
import { CategoryService } from '../../category.service';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) {}

  @Effect()
  queryCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CategoriesActionTypes.QueryCategories),
    switchMap(() => this.categoryService.queryCategories()),
    map((categories: Category[]) => new AddAllCategories(categories)),
    catchError(() => of(null))
  );
}
