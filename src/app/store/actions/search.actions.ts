import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  ShowSearch = '[Search] Show Search',
  HideSearch = '[Search] Hide Search',
}

export class ShowSearch implements Action {
  readonly type = SearchActionTypes.ShowSearch;
}

export class HideSearch implements Action {
  readonly type = SearchActionTypes.HideSearch;
}

export type SearchActions = ShowSearch | HideSearch;
