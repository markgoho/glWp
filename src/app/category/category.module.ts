import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
  declarations: [CategoryComponent, CategoryListComponent],
})
export class CategoryModule {}
