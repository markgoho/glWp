import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromPosts from '../reducers/posts.reducer';

export const getPostsEntities = createSelector(fromRoot.getPostsState, fromPosts.getPostEntities);
