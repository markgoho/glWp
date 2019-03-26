import { SearchActions, SearchActionTypes } from '../actions/search.actions';

export interface SearchState {
  searching: boolean;
}

export const initialState: SearchState = {
  searching: false,
};

export function searchReducer(
  state: SearchState = initialState,
  action: SearchActions
): SearchState {
  switch (action.type) {
    case SearchActionTypes.ShowSearch: {
      state = {
        searching: true,
      };
      break;
    }

    case SearchActionTypes.HideSearch: {
      state = {
        searching: false,
      };
      break;
    }
  }

  return state;
}
