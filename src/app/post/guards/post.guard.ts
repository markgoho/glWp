import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PostsState } from '../../store/reducers/posts.reducer';
import { getPostsEntities } from '../../store/selectors/posts.selectors';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { Post } from '../models/post.interface';
import { LoadPost } from '../../store/actions/posts.actions';

@Injectable({
  providedIn: 'root',
})
export class PostGuard implements CanActivate {
  constructor(private store: Store<PostsState>) {}

  getFromStoreOrAPI(slug: string): Observable<any> {
    return this.store.pipe(
      select(getPostsEntities),
      tap((posts: { [slug: string]: Post }) => {
        if (posts[slug] == null) {
          this.store.dispatch(new LoadPost(slug));
        }
      }),
      filter((posts: { [slug: string]: Post }) => posts[slug] != null),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // return of(true | false)
    const slug = route.params.postSlug;

    return this.getFromStoreOrAPI(slug).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
