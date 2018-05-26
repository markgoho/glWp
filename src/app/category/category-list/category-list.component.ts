import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from '../models/category.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categories$: Observable<Category[]>;

  constructor(private db: AngularFirestore) {
    this.categories$ = this.db.collection<Category>('categories').valueChanges();
  }
}
