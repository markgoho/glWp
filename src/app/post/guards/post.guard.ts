import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { PostsService } from '../../posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostGuard implements CanActivate {
  constructor(private postsService: PostsService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = next.paramMap.get('postSlug');

    return this.postsService.postEntities$.pipe(
      take(1),
      map(entities => !!entities[slug]),
      tap((postExists: boolean) => {
        if (!postExists) {
          this.router.navigate(['/404']);
        }
      })
    );
  }
}
