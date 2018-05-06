import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PostsState } from '../../../store/reducers/posts.reducer';
import { getPostsEntities } from '../../../store/selectors';
import { Post } from '../../models/post.interface';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post$: Observable<Post>;
  content: string;

  constructor(private store: Store<PostsState>, private route: ActivatedRoute) {
    this.post$ = this.store.pipe(
      select(getPostsEntities),
      map(posts => posts[this.route.snapshot.params.postSlug])
      // tap((post: Post) => {
      //   const doc = this.parse(post.content.rendered);
      //   const children = doc.body.children;
      //   console.log(children);
      // })
    );
  }

  // parse(content: string): Document {
  //   const parser = new DOMParser();
  //   return parser.parseFromString(content, 'text/html');
  // }
}
