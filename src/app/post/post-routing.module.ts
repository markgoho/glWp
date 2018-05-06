import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './containers/posts/posts.component';
import { PostComponent } from './containers/post/post.component';
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PostGuard],
})
export class PostRoutingModule {}
