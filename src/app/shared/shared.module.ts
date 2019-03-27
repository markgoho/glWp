import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { RouterModule } from '@angular/router';
import { PostSnippetComponent } from './components/post-snippet/post-snippet.component';
import { SearchSnippetComponent } from './components/search-snippet/search-snippet.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ExcerptPipe, PostSnippetComponent, SearchSnippetComponent],
  exports: [ExcerptPipe, PostSnippetComponent, SearchSnippetComponent],
})
export class SharedModule {}
