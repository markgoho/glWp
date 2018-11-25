import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { CategoryService } from './category.service';

// tslint:disable-next-line:no-empty no-string-literal
const gtag: any = window['gtag'] || function(...data: any[]) {};

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
  year = new Date().getFullYear();

  constructor(
    private router: Router,
    private postsService: PostsService,
    private categoryService: CategoryService
  ) {}

  // @HostListener('window:resize', ['$event'])
  // onResize(): void {
  //   console.log('Inner width', window.innerWidth);
  //   console.log('Outer width', window.outerWidth);
  // }

  getDepth(outlet: any) {
    return outlet.activatedRouteData.depth;
  }

  ngOnInit() {
    this.categoryService.loadAllCategories();
    this.postsService.loadAllPosts();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        gtag('config', 'UA-86099056-1', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
