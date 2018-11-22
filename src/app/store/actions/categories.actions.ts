import { Action } from '@ngrx/store';
import { Category } from '../../category/models/category.interface';

export enum CategoriesActionTypes {
  QueryCategories = '[Categories] Query',
  AddAllCategories = '[Categories] Add All',
}

export class QueryCategories implements Action {
  readonly type = CategoriesActionTypes.QueryCategories;
}

export class AddAllCategories implements Action {
  readonly type = CategoriesActionTypes.AddAllCategories;
  constructor(public payload: Category[]) {}
}

export type CategoriesActions = QueryCategories | AddAllCategories;
