import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoriesState, categoryAdapter } from '../reducers/categories.reducer';
import { getParams } from './router.selectors';
import { Category } from '../../category/models/category.interface';
import { Dictionary } from '@ngrx/entity';

const getCategoriesState = createFeatureSelector<CategoriesState>('categories');

const { selectEntities, selectAll } = categoryAdapter.getSelectors(getCategoriesState);

export const getAllCategories = createSelector(
  selectAll,
  categories => categories
);

export const getCurrentCategory = createSelector(
  selectEntities,
  getParams,
  (categories, params) => categories[params.categorySlug]
);

export const getFullCategoryName = createSelector(
  selectEntities,
  (categories: Dictionary<Category>, props: any) => {
    const category: Category = categories[props.slug];
    return category.name;
  }
);
