import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../../post/models/post.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-snippet',
  templateUrl: './search-snippet.component.html',
  styleUrls: ['./search-snippet.component.scss'],
})
export class SearchSnippetComponent implements OnInit {
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
