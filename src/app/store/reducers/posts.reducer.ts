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
    case PostsActionTypes.LoadPost: {
      return {
        ...state,
        loading: true,
      };
    }

    // case PostsActions.LoadPostsSuccess: {
    //   const post = action.payload;

    //   const entities = helpAssets.reduce((newEntities: { [slug: string]: Post }, post: Post) => {
    //     return {
    //       ...newEntities,
    //       [post.slug]: post,
    //     };
    //   }, {});

    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     entities,
    //   };
    // }

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
