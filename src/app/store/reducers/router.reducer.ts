import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RouterState> = {
  routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'routerReducer'
);

export const getQueryParams = (state: RouterState) => state.routerReducer.state.queryParams;
export const getParams = (state: RouterState) => state.routerReducer.state.queryParams;
export const getUrl = (state: RouterState) => state.routerReducer.state.queryParams;
