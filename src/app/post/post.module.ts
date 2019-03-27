import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './containers/post/post.component';
import { PostsComponent } from './containers/posts/posts.component';
import { RouterModule, Routes } from '@angular/router';
import { PostContentComponent } from './components/post-content/post-content.component';
import { SharedModule } from '../shared/shared.module';
import { PostGuard } from './guards/post.guard';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: ':postSlug',
    component: PostComponent,
    canActivate: [PostGuard],
    data: { depth: 3 },
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [PostComponent, PostsComponent, PostContentComponent],
})
export class PostModule {}
