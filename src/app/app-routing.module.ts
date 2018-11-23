import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
