import { PostsActionTypes, PostsActions } from '../actions/posts.actions';
import { Post } from '../../post/models/post.interface';

export interface PostsState {
  entities: { [slug: string]: Post };
  loading: boolean;
  query: string;
}

export const initialState: PostsState = {
  entities: {},
  loading: false,
  query: '',
};

export function reducer(state = initialState, action: PostsActions): PostsState {
  switch (action.type) {
    case PostsActionTypes.LoadRecentPosts:
    case PostsActionTypes.LoadPost: {
      return {
        ...state,
        loading: true,
      };
    }

    case PostsActionTypes.LoadRecentPostsSuccess: {
      const posts: Post[] = action.payload;

      const entities = posts.reduce((newEntities: { [slug: string]: Post }, post: Post): any => {
        return {
          ...newEntities,
          [post.slug]: post,
        };
      }, {});

      return {
        ...state,
        loading: false,
        entities,
      };
    }

    case PostsActionTypes.LoadPostSuccess: {
      const post = action.payload;

      const entities = {
        ...state.entities,
        [post.slug]: post,
      };

      return {
        ...state,
        entities,
        loading: false,
      };
    }

    // case PostsActionTypes.HelpAssetSearchQuery: {
    //   const query = action.payload;

    //   return {
    //     ...state,
    //     query,
    //   };
    // }

    default:
      return state;
  }
}

export const getPostEntities = (state: PostsState) => state.entities;
export const getPostLoading = (state: PostsState) => state.loading;
