import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostsService } from '../../posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostGuard implements CanActivate {
  constructor(private postsService: PostsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // return of(true | false)
    const slug = route.paramMap.get('postSlug');

    return this.postsService.postEntities$.pipe(
      map(posts => {
        if (!!posts[slug] === false) {
          this.router.navigate(['/404']);
        }

        return !!posts[slug];
      })
    );
  }
}
