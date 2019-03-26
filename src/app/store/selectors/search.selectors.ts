import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

const getSearchState = createFeatureSelector<SearchState>('search');

export const searching = createSelector(
  getSearchState,
  state => state.searching
);
