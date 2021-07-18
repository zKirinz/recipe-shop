import { Recipe } from '../recipe.model';
import * as recipe from './recipe.constants';
import { RecipesActions } from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function reducer(state = initialState, action: RecipesActions) {
  switch (action.type) {
    case recipe.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case recipe.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case recipe.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case recipe.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
