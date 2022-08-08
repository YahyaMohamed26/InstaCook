import Ingredient from './ingredient';
import Recipe from './recipe';

export interface RecipePost {
  id: string;
  title: string;
  description?: string;
  calorieInfo?: string;
  image: string;
  tags?: string[];
  ingredients: Array<Ingredient>;
  directions: string[];
  time?: number;
  likes?: number;
  missedIngredientCount?: number;
}
