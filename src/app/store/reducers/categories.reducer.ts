import { CategoriesActionTypes, CategoriesActions } from '../actions/categories.actions';
import { Category } from '../../category/models/category.interface';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export function selectCategoryId(c: Category): string {
  return c.slug;
}

export const categoryAdapter = createEntityAdapter<Category>({ selectId: selectCategoryId });

export interface CategoriesState extends EntityState<Category> {}

export const initialState: CategoriesState = categoryAdapter.getInitialState();

export function categoriesReducer(
  state: CategoriesState = initialState,
  action: CategoriesActions
): CategoriesState {
  switch (action.type) {
    case CategoriesActionTypes.AddAllCategories: {
      return categoryAdapter.addAll(action.payload, state);
    }

    default:
      return state;
  }
}
