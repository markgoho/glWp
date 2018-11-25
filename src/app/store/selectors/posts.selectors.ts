import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostsState, postAdapter } from '../reducers/posts.reducer';
import { Post } from '../../post/models/post.interface';
import { getParams } from './router.selectors';

const getPostsState = createFeatureSelector<PostsState>('posts');

const { selectAll, selectEntities } = postAdapter.getSelectors(getPostsState);

export const getAllPosts = createSelector(
  selectAll,
  posts => posts
);

export const getRecentPosts = createSelector(
  getAllPosts,
  (posts: Post[]) => {
    const sortedPosts = posts.sort((a, b) => {
      return a.modified < b.modified ? 1 : -1;
    });

    return sortedPosts.slice(0, 12);
  }
);

export const getPostBySlug = createSelector(
  selectEntities,
  getParams,
  (postEntities, params) => postEntities[params.postSlug]
);

export const getPostsByCategory = createSelector(
  getAllPosts,
  getParams,
  (posts, params) => {
    return posts.filter(post => {
      return post.categoryArray.includes(params.categorySlug);
    });
  }
);
