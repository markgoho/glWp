import { Component, ElementRef, OnInit } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent implements OnInit {
  options = {
    rootMargin: '0px',
    threshold: 1,
  };
  inView$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  observer: IntersectionObserver;

  constructor(public postsService: PostsService, private element: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        this.inView$.next(entry.isIntersecting);
      });
    });
    this.observer.observe(this.element.nativeElement);
  }
}
