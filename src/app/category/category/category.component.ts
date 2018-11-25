import { Component } from '@angular/core';
import { PostsService } from '../../posts.service';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(public postsService: PostsService, public categoryService: CategoryService) {}
}
