import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './home/home.module#HomeModule',
    data: { depth: 0 },
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule',
  },
  {
    path: 'history',
    loadChildren: './history/history.module#HistoryModule',
  },
  {
    path: 'posts/category',
    loadChildren: './category/category.module#CategoryModule',
    data: { depth: 1 },
  },
  {
    path: 'posts',
    loadChildren: './post/post.module#PostModule',
    data: { depth: 1 },
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
