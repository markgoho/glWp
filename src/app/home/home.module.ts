import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { StepsComponent } from './components/steps/steps.component';
import { RecentPostsComponent } from './containers/recent-posts/recent-posts.component';
import { RecentPostComponent } from './components/recent-post/recent-post.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, StepsComponent, RecentPostsComponent, RecentPostComponent],
})
export class HomeModule {}
