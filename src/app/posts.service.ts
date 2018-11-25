import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PostsState } from './store/reducers/posts.reducer';
import { Store, select } from '@ngrx/store';
import { Post } from './post/models/post.interface';
import { QueryPosts } from './store/actions/posts.actions';
import { map, filter, tap } from 'rxjs/operators';
import {
  getRecentPosts,
  getPostBySlug,
  getAllPosts,
  getPostsByCategory,
} from './store/selectors/posts.selectors';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  allPosts$: Observable<Post[]>;
  recentPosts$: Observable<Post[]>;
  postBySlug$: Observable<Post>;
  postsByCategory$: Observable<Post[]>;

  constructor(
    private afs: AngularFirestore,
    private store: Store<PostsState>,
    private titleService: Title
  ) {
    this.allPosts$ = this.store.pipe(select(getAllPosts));
    this.recentPosts$ = this.store.pipe(select(getRecentPosts));
    this.postBySlug$ = this.store.pipe(
      select(getPostBySlug),
      filter(Boolean),
      tap((post: Post) => this.titleService.setTitle(post.title))
    );
    this.postsByCategory$ = this.store.pipe(select(getPostsByCategory));
  }

  loadAllPosts(): void {
    this.store.dispatch(new QueryPosts());
  }

  queryPosts(): Observable<Post[]> {
    return this.afs
      .collection<Post>('posts')
      .snapshotChanges()
      .pipe(
        map((arr: DocumentChangeAction<Post>[]) => {
          return arr.map(doc => {
            const data = doc.payload.doc.data();
            return { id: doc.payload.doc.id, ...data };
          });
        })
      );
  }
}
