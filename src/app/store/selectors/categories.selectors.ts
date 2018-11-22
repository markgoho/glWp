import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoriesState, categoryAdapter } from '../reducers/categories.reducer';

const getCategoriesState = createFeatureSelector<CategoriesState>('categories');

const { selectAll } = categoryAdapter.getSelectors(getCategoriesState);

export const getAllCategories = createSelector(
  selectAll,
  categories => categories
);
