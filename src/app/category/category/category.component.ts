import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  posts$: Observable<any[]>;
  params$: Observable<Params>;
  category$: Observable<any>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    // this.category$ = this.db.doc<Category>('categories/failure-analysis').valueChanges();

    this.posts$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const categorySlug = params.categorySlug;
        this.category$ = this.db.doc(`categories/${categorySlug}`).valueChanges();

        return this.db
          .collection('posts', ref => ref.where(`categoryMap.${categorySlug}`, '==', true))
          .valueChanges();
      })
    );
  }
}
