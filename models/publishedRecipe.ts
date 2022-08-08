import Recipe from './recipe';

export interface PublishedRecipe {
  userId: string;
  recipe: Recipe;
}
