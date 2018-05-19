import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Category } from './models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(private store: Store<PostsState>) {}

  getFromStoreOrAPI(slug: string): Observable<any> {
    return this.store.pipe(
      select(getPostsEntities),
      tap((posts: { [slug: string]: Category }) => {
        if (posts[slug] == null) {
          this.store.dispatch(new LoadPost(slug));
        }
      }),
      filter((posts: { [slug: string]: Category }) => posts[slug] != null),
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
