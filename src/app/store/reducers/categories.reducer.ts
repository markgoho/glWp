import { Category } from '../../category/models/category.interface';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { addCategories } from '../actions/categories.actions';

export function selectCategoryId(c: Category): string {
  return c.slug;
}

export const categoryAdapter = createEntityAdapter<Category>({ selectId: selectCategoryId });

export interface CategoriesState extends EntityState<Category> {}

export const initialState: CategoriesState = categoryAdapter.getInitialState();

export const categoriesReducer = createReducer(
  initialState,
  on(addCategories, (state, { categories }) => categoryAdapter.addAll(categories, state))
);
