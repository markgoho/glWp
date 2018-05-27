import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PostsState } from './store/reducers/posts.reducer';
import { Store } from '@ngrx/store';
import { LoadPostsSuccess } from './store/actions/posts.actions';
import { tap } from 'rxjs/operators';
import { Post } from './post/models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts$: Observable<Post[]>;

  constructor(private db: AngularFirestore, private store: Store<PostsState>) {
    this.posts$ = this.db
      .collection<Post>('posts')
      .valueChanges()
      .pipe(tap((posts: Post[]) => this.store.dispatch(new LoadPostsSuccess(posts))));
  }
}
