import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [CommonModule, CategoryRoutingModule],
  declarations: [CategoryComponent, CategoryListComponent],
})
export class CategoryModule {}
