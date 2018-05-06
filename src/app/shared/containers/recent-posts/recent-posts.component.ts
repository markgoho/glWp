import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../post/models/post.interface';
import { Store, select } from '@ngrx/store';
import { PostsState } from '../../../store/reducers/posts.reducer';
import { getRecentPosts } from '../../../store/selectors/posts.selectors';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent {
  recentPosts$: Observable<Post[]>;

  constructor(private store: Store<PostsState>) {
    this.recentPosts$ = this.store.pipe(select(getRecentPosts));
  }
}
