import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { StepsComponent } from './components/steps/steps.component';
import { RecentPostsComponent } from './containers/recent-posts/recent-posts.component';
import { HeroComponent } from './components/hero/hero.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, StepsComponent, RecentPostsComponent, HeroComponent],
})
export class HomeModule {}
