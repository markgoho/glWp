import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { AppState } from '../reducers';
import { RouterStateUrl } from '../reducers/router.reducer';

const getRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>(
  'router'
);

export const getQueryParams = createSelector(
  getRouterState,
  router => router.state.queryParams
);
export const getParams = createSelector(
  getRouterState,
  router => router.state.params
);
export const getUrl = createSelector(
  getRouterState,
  router => router.state.url
);
