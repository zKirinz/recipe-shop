import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shoppping-list.actions';

export interface ShoppingListI {
  ingredients: Ingredient[];
}

const initialState: ShoppingListI = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state: ShoppingListI = initialState,
  action: ShoppingListActions.ShoppingListActions
): ShoppingListI {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    default:
      return state;
  }
}
