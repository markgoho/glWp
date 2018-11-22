import { Action } from '@ngrx/store';
import { Post } from '../../post/models/post.interface';

export enum PostsActionTypes {
  QueryPosts = '[Posts] Query',
  AddAllPosts = '[Posts] Add All',
}

export class QueryPosts implements Action {
  readonly type = PostsActionTypes.QueryPosts;
}

export class AddAllPosts implements Action {
  readonly type = PostsActionTypes.AddAllPosts;
  constructor(public payload: Post[]) {}
}

export type PostsActions = QueryPosts | AddAllPosts;
