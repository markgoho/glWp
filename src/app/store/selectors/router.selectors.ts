import * as fromRouter from '../reducers/router.reducer';
import { getRouterState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getRouterReducerState = createSelector(getRouterState, (router: any) => router.state);

export const getQueryParams = createSelector(getRouterReducerState, fromRouter.getQueryParams);
export const getParams = createSelector(getRouterReducerState, fromRouter.getParams);
export const getUrl = createSelector(getRouterReducerState, fromRouter.getUrl);
