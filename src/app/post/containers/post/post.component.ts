import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Back } from '../../../store/actions/router.actions';
import { CategoryService } from '../../../category.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(
    public postsService: PostsService,
    public categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

  navigateBack(): void {
    this.store.dispatch(new Back());
  }
}
