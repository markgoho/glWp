import { Component } from '@angular/core';

import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  constructor(public categoryService: CategoryService) {}
}
