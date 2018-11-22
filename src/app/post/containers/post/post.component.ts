import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PostsService } from '../../../posts.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(public postsService: PostsService) {}
}
