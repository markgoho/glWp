import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromPosts from './posts.reducer';
import * as fromCategories from './categories.reducer';

import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.reducer';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export interface AppState {
  posts: fromPosts.PostsState;
  categories: fromCategories.CategoriesState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.reducer,
  categories: fromCategories.reducer,
  router: fromRouter.routerReducer,
};

export const getPostsState = createFeatureSelector<fromPosts.PostsState>('posts');
export const getCategoriesState = createFeatureSelector<fromCategories.CategoriesState>(
  'categories'
);
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'routerReducer'
);

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
