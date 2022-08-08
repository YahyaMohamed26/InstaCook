import axios from 'axios';
import { UserFilters } from '../models/filter';
import Ingredient from '../models/ingredient';
import Recipe from '../models/recipe';

// const API_KEY = '6b32ed719ae943b0b87cd02e036d8de3';
// const API_KEY = '20e2a8cdfdfb493f9930282fb17ed4fa';
// const API_KEY = 'e9d4e7f06b63482f8f7143a245bbf136';
// const API_KEY = '12a884ef6f554bf6afb81444086b5797';
// const API_KEY = '1ec158b8ecb740f48e65783b76657ebd';

// const API_KEY = '4f5f533e67304bfe8eb5f882dbd8463c';
const BASE_URL = 'https://api.spoonacular.com/recipes';
// const API_KEY = '8fc8fbfb2b354fc4b15fc95dd806fec6';
// const API_KEY = 'd2f8039afa884d84968cf87afb2047b7';
// const API_KEY = '99de38171d4846799c0cc00e2762b0d1';
// const API_KEY = '33b680cbe43e4691b94ee5567ea570ac';
const API_KEY = 'e203ac1e2bfa431da0892f9cd3aae16e';

/**
 * Generates the request url to be called
 * @param path the path to be appended to the base url
 * before the api key. .i.e. '/findByIngredients?ingrediients=apples,flour'
 * @returns The full url to be called
 */
const getReqUrl = (path: string) => `${BASE_URL}${path}&apiKey=${API_KEY}`;

export interface SearchResult {
  id: number;
  image: string;
  imageType: string;
  title: string;
}

class RecipesApi {
  static async getRecipesByIngredients(
    ingredients: string[],
    recipePerRequest = 2,
    filters?: UserFilters
  ): Promise<Recipe[]> {
    // Path for requesting recipes by ingredients
    const path = `/findByIngredients?ingredients=${ingredients.join(
      ','
    )}&number=${recipePerRequest}`;
    // Full request url
    const url = getReqUrl(path);
    let res = await axios.get(url);
    if (res.status !== 200)
      throw new Error('Failed to fetch suggested recipes');

    const recipeIds = res.data.map((item) => item.id);

    res = await axios.get(
      getReqUrl('/informationBulk?ids=' + recipeIds.join(','))
    );
    // console.log(recipeIds);

    const extractIngredients = (resultItem) => {
      return resultItem.extendedIngredients.map((item) => {
        const ingredient: Ingredient = {
          id: item.id?.toString(),
          name: item.name,
          quantity: item.amount,
          imgUrl: this.getIngredientUrl(item.image),
        };
        return ingredient;
      });
    };

    const recipes: Recipe[] = res.data.map((resultItem: any) => {
      const recipeIteem: Recipe = {
        id: resultItem.id.toString(),
        title: resultItem.title,
        description: resultItem.summary,
        // missedIngredientCount: resultItem.missedIngredientCount,
        missedIngredientCount: 2,
        calorieInfo: '145',
        time: resultItem.readyInMinutes,
        image: resultItem.image,
        tags: resultItem.diets || ['Vegan', 'Gluten Free'],
        likes: resultItem.aggregateLikes,
        directions: [],
        ingredients: extractIngredients(resultItem),
        isPublishedByUser: false,
        diets: resultItem.diets,
      };
      console.log(recipeIteem.tags);
      return recipeIteem;
    });

    // console.log(recipes);

    // const recipes: Recipe[] = await Promise.all(
    //   res.data.map(async (recipe: any) => {
    //     const resultDetails = await RecipesApi.getRecipeDetailsByRecipeId(
    //       recipe.id
    //     );
    //     return {
    //       id: recipe.id,
    //       title: recipe.title,
    //       missedIngredientCount: recipe.missedIngredientCount,
    //       image: recipe.image,
    //       tags: ['Gluten Free', 'Vegan'],
    //       likes: recipe.likes,
    //       time: resultDetails.time,
    //       calorieInfo: resultDetails.calorieInfo,
    //       description: resultDetails.description,
    //     };
    //   })
    // );

    // console.log('fetched ====> ', recipes);
    const recipesFinal = new Array();
    recipes.forEach((recipe) => {
      if (
        recipe.image ===
        'https://spoonacular.com/recipeImages/621189-312x231.jpg'
      ) {
      } else {
        recipesFinal.push(recipe);
      }
    });
    return recipesFinal;
  }

  // static getImageUrl(recipeId: number): string {
  //   return 'https://spoonacular.com/cdn/ingredients_250x250/apple.jpg'
  // }
  static async getRecipeDetailsByRecipeId(recipeId: number): Promise<Recipe> {
    // Path for requesting recipe by id
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/' +
        recipeId.toString() +
        `/information?includeNutrition=true&apiKey=${API_KEY}`
    );

    let result = res.data;
    let recipe: Recipe;

    let id = recipeId;
    let title = result.title;
    let description = result.summary;
    let missingItemInfo = '0';
    let calorieInfo = Math.floor(result.nutrition.nutrients[0].amount);
    let photoSource = result.image;
    let tags = [];
    let ingredients = [];
    let directions = [];
    let time = result.readyInMinutes;

    //Dietary restrictions
    if (result.vegetarian) tags.push('Vegeterian');
    if (result.vegan) tags.push('Vegan');
    if (result.glutenFree) tags.push('Gluten Free');
    if (result.dairyFree) tags.push('Dairy-Free');
    if (result.veryHealthy) tags.push('Very Healthy');
    if (result.sustainable) tags.push('Sustainable');

    //Ingredients
    result.extendedIngredients.map((item, index) => {
      let ingredientId = item.id;
      let ingredientName = item.name;
      let ingredientAmount = item.amount;
      let ingredientMeasuring = item.unit;
      let avatarUrl =
        'https://spoonacular.com/cdn/ingredients_100x100/' + item.image;

      let exists = true;
      let ingredient: Ingredient = {
        id: item.id,
        name: item.name,
        quantity: item.amount,
        imgUrl: avatarUrl,
        // ingredientId,
        // ingredientName,
        // ingredientAmount,
        // ingredientMeasuring,
        // avatarUrl,
        // exists,
      };
      ingredients.push(ingredient);
    });

    //Directions
    if (result.analyzedInstructions && result.analyzedInstructions.length > 0) {
      result.analyzedInstructions[0].steps.map((item, index) => {
        directions.push(item.step);
      });
    }

    //Assemble the recipe elements
    recipe = {
      id: id.toString(),
      title,
      description,
      missedIngredientCount: 0,
      calorieInfo: calorieInfo.toString(),
      image: photoSource,
      tags,
      ingredients,
      directions,
      time,
    };

    console.log('recipe -=-=> ', recipe);
    return recipe;
  }

  static getIngredientUrl = (name: string) =>
    `https://spoonacular.com/cdn/ingredients_100x100/${name}.jpg`;

  static searchRecipeByName = async (name: string) => {
    const endpoint = getReqUrl(`/complexSearch?query=${name}&number=10`);
    try {
      const res = await axios.get(endpoint);
      return res.data.results as Array<SearchResult>;
    } catch (error) {
      console.log(error);
    }
  };

  static advancedRecipeSuggestion = async (
    ingredients: string[]
  ): Promise<Recipe[]> => {
    try {
      const ingredientNames = ingredients.join(',').toLowerCase();
      const endpoint = getReqUrl(
        `/complexSearch?includeIngredients=${ingredientNames}&number=10&addRecipeInformation=true`
      );
      console.log(endpoint);
      const res = await axios.get(endpoint);

      if (res.status === 200) {
        const recipes = Array<Recipe>();
        res.data.results.forEach((item) => {
          recipes.push({
            id: item.id,
            title: item.title,
            image: item.image,
            directions: [],
            ingredients: [],
            missedIngredientCount: 2,
            description: item.summary,
            // calorieInfo: item.nutrition.nutrients[0].amount,
            calorieInfo: '100',
            isPublishedByUser: false,
            likes: item.aggregateLikes,
            tags: [],
            time: item.readyInMinutes,
          });
        });
        return recipes;
      }
      console.log(res.data);
      return [];
    } catch (error) {
      console.log(error);
    }
  };
}

export default RecipesApi;
