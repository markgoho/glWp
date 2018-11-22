import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromPosts from './posts.reducer';
import * as fromCategories from './categories.reducer';
import { RouterStateUrl } from './router.reducer';

export interface AppState {
  posts: fromPosts.PostsState;
  categories: fromCategories.CategoriesState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.postsReducer,
  categories: fromCategories.categoriesReducer,
  router: routerReducer,
};
