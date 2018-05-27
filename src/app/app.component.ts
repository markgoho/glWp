import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { CategoryService } from './category.service';
// import { Store } from '@ngrx/store';
// import { PostsState } from './store/reducers/posts.reducer';
// import { LoadRecentPosts } from './store/actions/posts.actions';
// import { LoadCategories } from './store/actions/categories.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('0 => 1, 1 => 2, 2 => 3, 0 => 3', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))
          ),
        ]),
      ]),
      transition('3 => 2, 2 => 1, 1 => 0, 3 => 0', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private posts: PostsService,
    private categories: CategoryService
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(): void {
  //   console.log('Inner width', window.innerWidth);
  //   console.log('Outer width', window.outerWidth);
  // }

  getDepth(outlet: any) {
    return outlet.activatedRouteData.depth;
  }

  ngOnInit() {
    this.posts.posts$.subscribe();
    this.categories.categories$.subscribe();
  }
}
