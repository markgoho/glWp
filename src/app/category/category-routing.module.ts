import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  {
    path: ':categorySlug',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
