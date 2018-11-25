import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(public postsService: PostsService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Success Stories');
  }
}
