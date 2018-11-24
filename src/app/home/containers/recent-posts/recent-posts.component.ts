import { Component } from '@angular/core';
import { PostsService } from '../../../posts.service';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent {
  constructor(public postsService: PostsService) {}
}
