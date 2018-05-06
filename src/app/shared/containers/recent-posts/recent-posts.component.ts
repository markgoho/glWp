import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../../../post/models/post.interface';
import { Store, select } from '@ngrx/store';
import { PostsState } from '../../../store/reducers/posts.reducer';
import { getRecentPosts } from '../../../store/selectors/posts.selectors';

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

  recentPosts$: Observable<Post[]>;

  constructor(private store: Store<PostsState>, private element: ElementRef) {
    this.recentPosts$ = this.store.pipe(select(getRecentPosts));
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        this.inView$.next(entry.isIntersecting);
      });
    });
    this.observer.observe(this.element.nativeElement);
  }
}
