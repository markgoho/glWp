import { createAction, props } from '@ngrx/store';
import { Category } from '../../category/models/category.interface';

export const queryCategories = createAction('[Categories] Query');
export const addCategories = createAction(
  '[Categories] Add All',
  props<{ categories: Category[] }>()
);
