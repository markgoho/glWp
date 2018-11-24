import { Component, Input, ChangeDetectionStrategy, ElementRef, OnInit } from '@angular/core';
import { Post } from '../../../post/models/post.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-snippet',
  templateUrl: './post-snippet.component.html',
  styleUrls: ['./post-snippet.component.scss'],
})
export class PostSnippetComponent implements OnInit {
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
