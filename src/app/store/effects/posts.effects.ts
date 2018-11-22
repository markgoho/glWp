import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { PostsActionTypes, AddAllPosts } from '../actions/posts.actions';
import { PostsService } from '../../posts.service';
import { Post } from '../../post/models/post.interface';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}
  @Effect()
  queryPosts$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionTypes.QueryPosts),
    switchMap(() => this.postsService.queryPosts()),
    map((posts: Post[]) => new AddAllPosts(posts)),
    catchError(() => of(null))
  );
}
