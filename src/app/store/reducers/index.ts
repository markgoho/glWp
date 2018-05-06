import { ActionReducerMap } from '@ngrx/store';

import * as fromPosts from './posts.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  posts: fromPosts.PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.reducer,
};

export const getPostsState = createFeatureSelector<fromPosts.PostsState>('posts');
