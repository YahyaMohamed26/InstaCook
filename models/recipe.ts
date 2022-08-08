// The model for dummy recipes.
// Later to be changed according to the database.
interface Recipe {
  id: string;
  title: string;
  description?: string;
  missedIngredientCount: number;
  calorieInfo?: string;
  image: string;
  tags?: Array<string>;
  ingredients: Array<Ingredient>;
  directions: Array<string>;
  time?: number;
  likes?: number;
  isPublishedByUser?: boolean;
  diets?: Array<string>;
}
interface Ingredient {
  id: string;
  name: string;
  amount?: number;
  measureing?: string;
  avatarUrl?: NodeRequire;
  exists?: boolean;
}

const dummyRecipes: Array<Recipe> = [
  {
    id: '1',
    title: 'Pasta',
    description:
      'Small description about the food recipe will be displayed in this section! 1',
    missedIngredientCount: 1,
    calorieInfo: '145',
    image: 'food1.jpg',
    tags: ['Gluten Free', 'Vegan'],
    ingredients: [
      {
        id: '0',
        name: 'Potato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/potato.png'),
        exists: true,
      },
      {
        id: '1',
        name: 'Tomato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/tomato.png'),
        exists: false,
      },
    ],
    directions: [
      'Cut the potatoes',
      'Boil the potatos',
      'Cut the potatoes',
      'Boil the potatos',
      'Cut the potatoes',
      'Boil the potatos',
      'Cut the potatoes',
      'Boil the potatos',
      'Cut the potatoes',
      'Boil the potatos',
    ],
    time: 30,
  },
  {
    id: '2',
    title: 'Rice',
    description:
      'Small description about the food recipe will be displayed in this section! 2',
    missedIngredientCount: 2,
    calorieInfo: '120',
    image: 'food1.jpg',
    tags: ['Gluten Free', 'Vegan'],
    ingredients: [
      {
        id: '1',
        name: 'Potato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/potato.png'),
        exists: true,
      },
    ],
    directions: ['Cut the potatoes'],
    time: 30,
  },
  {
    id: '3',
    title: 'Potato',
    description:
      'Small description about the food recipe will be displayed in this section! 3',
    missedIngredientCount: 2,
    calorieInfo: '145',
    image: 'food1.jpg',
    tags: ['Gluten Free', 'Vegan'],
    ingredients: [
      {
        id: '1',
        name: 'Potato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/potato.png'),
        exists: true,
      },
    ],
    directions: ['Cut the potatoes'],
    time: 30,
  },

  {
    id: '4',
    title: 'Noodles',
    description:
      'Small description about the food recipe will be displayed in this section! 3',
    missedIngredientCount: 5,
    calorieInfo: '145',
    image: 'food1.jpg',
    tags: ['Gluten Free', 'Vegan'],
    ingredients: [
      {
        id: '1',
        name: 'Potato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/potato.png'),
        exists: true,
      },
    ],
    directions: ['Cut the potatoes'],
    time: 30,
  },
  {
    id: '5',
    title: 'Steak',
    description:
      'Small description about the food recipe will be displayed in this section! 3',
    missedIngredientCount: 1,
    calorieInfo: '145',
    image: 'food1.jpg',
    tags: ['Gluten Free', 'Vegan'],
    ingredients: [
      {
        id: '1',
        name: 'Potato',
        amount: 2,
        measureing: 'amount',
        avatarUrl: require('../assets/images/potato.png'),
        exists: true,
      },
    ],
    directions: ['Cut the potatoes'],
    time: 30,
  },
];

export default Recipe;
export { dummyRecipes };
