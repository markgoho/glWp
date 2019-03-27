import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SearchService } from '../search.service';
import * as algolia from 'algoliasearch/lite';
import { PostSnippet } from '../post/models/postSnippet';
const APP_ID = 'VBY10K87KH';
const API_KEY = '6e973bbf671a43c9edcb39a069a64637';
const client = algolia(APP_ID, API_KEY);

interface HighlightResult {
  fullyHighlighted?: boolean;
  matchLevel: string;
  matchedWords: string[];
  value: string;
}
interface AlgoliaPost {
  alt: string;
  categories: string[];
  content: string;
  excerpt: string;
  featuredImage: string;
  objectID: string;
  title: string;
  _highlightResult: {
    excerpt: HighlightResult;
    title: HighlightResult;
  };
}

const parser = new DOMParser();

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
    this.index.search<AlgoliaPost>({ query }, (_err, res) => {
      this.results = res;
      this.hits = this.prepareHits(res.hits);
    });
  }

  private prepareHits(hits: AlgoliaPost[]): PostSnippet[] {
    return hits.map(hit => {
      return {
        title: hit._highlightResult.title.value,
        excerpt: hit._highlightResult.excerpt.value,
        slug: hit.objectID,
        media: {
          alt: hit.alt,
          image: {
            source_url: hit.featuredImage,
          },
        },
      };
    });
  }
}
