import { PostsEffects } from './posts.effects';
import { CategoriesEffects } from './categories.effects';

export const effects: any[] = [PostsEffects, CategoriesEffects];

export * from './posts.effects';
export * from './categories.effects';
