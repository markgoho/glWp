import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentPostsComponent } from './containers/recent-posts/recent-posts.component';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [RecentPostsComponent, ExcerptPipe],
  exports: [RecentPostsComponent, ExcerptPipe],
})
export class SharedModule {}
