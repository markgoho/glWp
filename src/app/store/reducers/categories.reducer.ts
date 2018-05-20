import { CategoriesActionTypes, CategoriesActions } from '../actions/categories.actions';
import { Category } from '../../category/models/category.interface';

export interface CategoriesState {
  entities: { [slug: string]: Category };
  loading: boolean;
  query: string;
}

export const initialState: CategoriesState = {
  entities: {},
  loading: false,
  query: '',
};

export function reducer(state = initialState, action: CategoriesActions): CategoriesState {
  switch (action.type) {
    case CategoriesActionTypes.LoadCategories: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoriesActionTypes.LoadCategoriesSuccess: {
      const categories: Category[] = action.payload;

      const entities = categories.reduce(
        (newEntities: { [slug: string]: Category }, category: Category): any => {
          return {
            ...newEntities,
            [category.slug]: category,
          };
        },
        {}
      );

      return {
        ...state,
        loading: false,
        entities,
      };
    }

    default:
      return state;
  }
}

export const getCategoriesEntities = (state: CategoriesState) => state.entities;
export const getCategoriesLoading = (state: CategoriesState) => state.loading;
