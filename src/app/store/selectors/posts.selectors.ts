import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromPosts from '../reducers/posts.reducer';
import { Post } from '../../post/models/post.interface';

export const getPostsEntities = createSelector(fromRoot.getPostsState, fromPosts.getPostEntities);

export const getPostsArray = createSelector(getPostsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getRecentPosts = createSelector(getPostsArray, (posts: Post[]) => {
  const sortedPosts = posts.sort((a, b) => {
    return a.modified < b.modified ? 1 : -1;
  });

  return sortedPosts.slice(0, 8);
});
