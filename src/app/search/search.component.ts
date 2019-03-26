import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SearchService } from '../search.service';
import * as algolia from 'algoliasearch/lite';
const APP_ID = 'VBY10K87KH';
const API_KEY = '6e973bbf671a43c9edcb39a069a64637';
const client = algolia(APP_ID, API_KEY);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string;
  hits: any[];
  results: any;
  index = client.initIndex('POSTS');

  constructor(public searchService: SearchService, private el: ElementRef) {}

  @ViewChild('searchInput') searchInput: ElementRef;

  @HostListener('document:keydown', ['$event'])
  keyDownHandler(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      // ESC to close the search box
      this.searchService.hideSearch();
    }
  }

  ngOnInit(): void {
    this.searchInput.nativeElement.focus();
  }

  handleSearch(query: string) {
    this.query = query;
    this.index.search({ query }, (_err, res) => {
      this.results = res;
      this.hits = res.hits;
      // this.cd.detectChanges();
    });
    // this.cd.detectChanges();
  }
}
