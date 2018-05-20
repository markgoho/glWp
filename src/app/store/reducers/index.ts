import { ActionReducerMap } from '@ngrx/store';

import * as fromPosts from './posts.reducer';
import * as fromCategories from './categories.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  posts: fromPosts.PostsState;
  categories: fromCategories.CategoriesState;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.reducer,
  categories: fromCategories.reducer,
};

export const getPostsState = createFeatureSelector<fromPosts.PostsState>('posts');
export const getCategoriesState = createFeatureSelector<fromCategories.CategoriesState>(
  'categories'
);
