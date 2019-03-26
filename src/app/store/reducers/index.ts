import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromPosts from './posts.reducer';
import * as fromCategories from './categories.reducer';
import * as fromSearch from './search.reducer';
import { RouterStateUrl } from './router.reducer';

export interface AppState {
  posts: fromPosts.PostsState;
  categories: fromCategories.CategoriesState;
  router: RouterReducerState<RouterStateUrl>;
  search: fromSearch.SearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.postsReducer,
  categories: fromCategories.categoriesReducer,
  router: routerReducer,
  search: fromSearch.searchReducer,
};
