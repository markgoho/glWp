import { Component, Input, ChangeDetectionStrategy, ElementRef, OnInit } from '@angular/core';
import { Post } from '../../../post/models/post.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.scss'],
})
export class RecentPostComponent implements OnInit {
  options = {
    rootMargin: '0px',
    threshold: 1,
  };
  inView$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  observer: IntersectionObserver;

  @Input()
  post: Post;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        this.inView$.next(entry.isIntersecting);
      });
    });
    this.observer.observe(this.element.nativeElement);
  }
}
