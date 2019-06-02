import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { depth: 0 },
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
  },
  {
    path: 'for-sale',
    loadChildren: () => import('./for-sale/for-sale.module').then(m => m.ForSaleModule),
  },
  {
    path: 'posts/category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    data: { depth: 1 },
  },
  {
    path: 'posts',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule),
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
