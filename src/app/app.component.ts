import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => 2, 2 => 3', [
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
      transition('3 => 2, 2 => 1', [
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
export class AppComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
  getDepth(outlet: any) {
    return outlet.activatedRouteData.depth;
  }
}
