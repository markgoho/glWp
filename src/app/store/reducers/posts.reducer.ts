import { PostsActionTypes, PostsActions } from '../actions/posts.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../post/models/post.interface';

export function selectPostId(c: Post): string {
  return c.slug;
}

export const postAdapter = createEntityAdapter<Post>({ selectId: selectPostId });

export interface PostsState extends EntityState<Post> {}

export const initialState: PostsState = postAdapter.getInitialState();

export function postsReducer(state: PostsState = initialState, action: PostsActions): PostsState {
  switch (action.type) {
    case PostsActionTypes.AddAllPosts: {
      return postAdapter.addAll(action.payload, state);
    }

    default:
      return state;
  }
}
