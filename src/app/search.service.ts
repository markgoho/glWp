import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { searching } from './store/selectors/search.selectors';
import { SearchState } from './store/reducers/search.reducer';
import { ShowSearch, HideSearch } from './store/actions/search.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searching$: Observable<boolean> = this.store.pipe(select(searching));
  constructor(private store: Store<SearchState>) {}

  showSearch(): void {
    this.store.dispatch(new ShowSearch());
  }

  hideSearch(): void {
    this.store.dispatch(new HideSearch());
  }
}
