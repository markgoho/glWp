import { Injectable } from '@angular/core';
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
  getPostEntities,
  loaded,
} from './store/selectors/posts.selectors';
import { Title } from '@angular/platform-browser';
import { Dictionary } from '@ngrx/entity';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  allPosts$: Observable<Post[]> = this.store.pipe(select(getAllPosts));
  recentPosts$: Observable<Post[]> = this.store.pipe(select(getRecentPosts));
  postBySlug$: Observable<Post> = this.store.pipe(
    select(getPostBySlug),
    filter(Boolean),
    tap((post: Post) => this.titleService.setTitle(post.title))
  );
  postsByCategory$: Observable<Post[]> = this.store.pipe(select(getPostsByCategory));
  postEntities$: Observable<Dictionary<Post>> = this.store.pipe(select(getPostEntities));
  loaded$: Observable<boolean> = this.store.pipe(select(loaded));

  constructor(
    private afs: AngularFirestore,
    private store: Store<PostsState>,
    private titleService: Title
  ) {}

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
            const data = doc.payload.doc.data() as Post;
            return { id: doc.payload.doc.id, ...data };
          });
        })
      );
  }
}
