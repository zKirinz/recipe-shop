import { ActionReducerMap } from '@ngrx/store';

import * as auth from '../auth/store';
import * as recipes from '../recipes/store';
import * as shoppingList from '../shopping-list/store';

export interface AppState {
  shoppingList: shoppingList.State;
  auth: auth.State;
  recipes: recipes.State;
}

export const rootReducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingList.reducer,
  auth: auth.reducer,
  recipes: recipes.reducer,
};
