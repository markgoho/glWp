import { PostsEffects } from './posts.effects';
import { CategoriesEffects } from './categories.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [PostsEffects, CategoriesEffects, RouterEffects];

export * from './posts.effects';
export * from './categories.effects';
export * from './router.effects';
