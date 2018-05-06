import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  PostsActionTypes,
  LoadPost,
  LoadPostSuccess,
  LoadPostFailure,
} from '../actions/posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  @Effect()
  loadPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPost),
    map((action: LoadPost) => action.payload),
    switchMap((slug: string) => {
      // Build HTTP Params
      let params = new HttpParams().set('slug', slug);
      params = params.append('_embed', 'true');

      return this.http.get(`https://admin.gideonlabs.ml/wp-json/wp/v2/posts`, { params }).pipe(
        map((response: any) => {
          const [post] = response;
          return new LoadPostSuccess(post);
        }),
        catchError(() => of(new LoadPostFailure()))
      );
    })
  );
}
