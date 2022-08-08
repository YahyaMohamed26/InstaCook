// TODO: Add other attributes as you need

export interface UserFilters {
  dietryRestrictions: Array<string>;
  minCalorie: number;
  maxCalorie: number;
  missingIngredientsMin: number;
  missingIngredientsMax: number;
  ingredientsToDiscard: Array<string>;
}

export const defaultFilters: UserFilters = {
  dietryRestrictions: [],
  ingredientsToDiscard: [],
  maxCalorie: 1000000,
  minCalorie: 0,
  missingIngredientsMax: 1000,
  missingIngredientsMin: 0,
};

interface Filter {
  id: number;
  title: string;
  included: boolean;
}

const dummyFilters: Filter[] = [
  {
    id: 7,
    title: 'Vegetarian',
    included: false,
  },
  {
    id: 8,
    title: 'Dairy Free',
    included: false,
  },
  {
    id: 9,
    title: 'Gluten Free',
    included: false,
  },
  {
    id: 10,
    title: 'Vegan',
    included: false,
  },
  {
    id: 11,
    title: 'Ketogenic',
    included: false,
  },
  {
    id: 12,
    title: 'Lactose',
    included: false,
  },
];

export default Filter;
export { dummyFilters };
