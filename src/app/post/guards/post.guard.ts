import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, filter, withLatestFrom } from 'rxjs/operators';

import { PostsService } from '../../posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostGuard implements CanActivate {
  constructor(private postsService: PostsService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = next.paramMap.get('postSlug');

    const loaded$ = this.postsService.loaded$.pipe(filter(Boolean));
    const post$ = this.postsService.postEntities$.pipe(map(entities => !!entities[slug]));

    return loaded$.pipe(
      withLatestFrom(post$),
      map(([postsLoaded, postExists]) => postsLoaded && postExists),
      tap((postExists: boolean) => {
        if (!postExists) {
          this.router.navigate(['/404']);
        }
      })
    );
  }
}
