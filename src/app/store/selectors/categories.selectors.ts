import { createSelector } from '@ngrx/store';
import { getCategoriesState } from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';

export const getCategoriesEntities = createSelector(
  getCategoriesState,
  fromCategories.getCategoriesEntities
);

export const getCategoriesArray = createSelector(getCategoriesEntities, entities => {
  return Object.keys(entities).map(slug => entities[slug]);
});
