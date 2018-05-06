import { Action } from '@ngrx/store';
import { Post } from '../../post/models/post.interface';

export enum PostsActionTypes {
  LoadRecentPosts = '[Posts] Load Recent Posts',
  LoadRecentPostsSuccess = '[Posts] Load Recent Posts Success',
  LoadPost = '[Posts] Load Single Post',
  LoadPostSuccess = '[Posts] Load Single Post Success',
  LoadPostFailure = '[Posts] Load Single Post Failure',
}

export class LoadRecentPosts implements Action {
  readonly type = PostsActionTypes.LoadRecentPosts;
}

export class LoadRecentPostsSuccess implements Action {
  readonly type = PostsActionTypes.LoadRecentPostsSuccess;
  constructor(public payload: Post[]) {}
}

export class LoadPost implements Action {
  readonly type = PostsActionTypes.LoadPost;
  constructor(public payload: string) {}
}

export class LoadPostSuccess implements Action {
  readonly type = PostsActionTypes.LoadPostSuccess;
  constructor(public payload: Post) {}
}

export class LoadPostFailure implements Action {
  readonly type = PostsActionTypes.LoadPostFailure;
}

export type PostsActions =
  | LoadPost
  | LoadPostSuccess
  | LoadPostFailure
  | LoadRecentPosts
  | LoadRecentPostsSuccess;
