import { Action } from '@ngrx/store';
import { Post } from '../../post/models/post.interface';

export enum PostsActionTypes {
  LoadPosts = '[Posts] Load Posts',
  LoadPost = '[Posts] Load Single Post',
  LoadPostSuccess = '[Posts] Load Single Post Success',
  LoadPostFailure = '[Posts] Load Single Post Failure',
}

export class LoadPosts implements Action {
  readonly type = PostsActionTypes.LoadPost;
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

export type PostsActions = LoadPost | LoadPosts | LoadPostSuccess | LoadPostFailure;
