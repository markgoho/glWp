import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CategoriesActionTypes,
  LoadCategoriesSuccess,
  LoadCategoriesFailure,
} from '../actions/categories.actions';
import { Category } from '../../category/models/category.interface';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadCategoriesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(CategoriesActionTypes.LoadCategories),
    switchMap(() => {
      return (
        this.http
          .get<Category[]>(`https://deployment-mg.firebaseapp.com/api/categories`)
          // tslint:disable-next-line:no-console
          .pipe(
            map((response: Category[]) => new LoadCategoriesSuccess(response)),
            catchError(() => of(new LoadCategoriesFailure()))
          )
      );
    })
  );
}
