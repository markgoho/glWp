import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './containers/post/post.component';
import { PostsComponent } from './containers/posts/posts.component';
import { RouterModule } from '@angular/router';
import { PostContentComponent } from './components/post-content/post-content.component';

@NgModule({
  imports: [CommonModule, RouterModule, PostRoutingModule],
  declarations: [PostComponent, PostsComponent, PostContentComponent],
})
export class PostModule {}
