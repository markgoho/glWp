import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../post/models/post.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  posts$: Observable<Post[]>;
  params$: Observable<Params>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.posts$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const category = params.categorySlug;
        return this.db
          .collection<Post>('posts', ref => ref.where(`categoryMap.${category}`, '==', true))
          .valueChanges();
      })
    );
  }
}
