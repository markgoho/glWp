import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(public searchService: SearchService) {}
}
