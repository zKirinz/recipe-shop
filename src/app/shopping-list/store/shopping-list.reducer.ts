import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingList from './shopping-list.constants';
import { ShoppingListActions } from './shoppping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function reducer(
  state: State = initialState,
  action: ShoppingListActions
): State {
  switch (action.type) {
    case shoppingList.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case shoppingList.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case shoppingList.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case shoppingList.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case shoppingList.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case shoppingList.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
