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
    case CategoriesActionTypes.LoadRecentCategories:
    case CategoriesActionTypes.LoadPost: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoriesActionTypes.LoadRecentCategoriesSuccess: {
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

    case CategoriesActionTypes.LoadCategorySuccess: {
      const post = action.payload;

      const entities = {
        ...state.entities,
        [post.slug]: post,
      };

      return {
        ...state,
        entities,
        loading: false,
      };
    }

    // case PostsActionTypes.HelpAssetSearchQuery: {
    //   const query = action.payload;

    //   return {
    //     ...state,
    //     query,
    //   };
    // }

    default:
      return state;
  }
}

export const getCategoryEntities = (state: CategoriesState) => state.entities;
export const getCategoryLoading = (state: CategoriesState) => state.loading;
