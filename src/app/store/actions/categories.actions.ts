import { Action } from '@ngrx/store';
import { Category } from '../../category/models/category.interface';

export enum CategoriesActionTypes {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesSuccess = '[Categories] Load Categories Success',
  LoadCategoriesFailure = '[Categories] Load Categories Failure',
}

export class LoadCategories implements Action {
  readonly type = CategoriesActionTypes.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.LoadCategoriesSuccess;
  constructor(public payload: Category[]) {}
}

export class LoadCategoriesFailure implements Action {
  readonly type = CategoriesActionTypes.LoadCategoriesFailure;
}

export type CategoriesActions = LoadCategories | LoadCategoriesSuccess | LoadCategoriesFailure;
