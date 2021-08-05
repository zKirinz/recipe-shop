import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';
import * as recipesActions from './recipe.actions';
import * as recipe from './recipe.constants';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(recipe.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://udemy-37087-default-rtdb.asia-southeast1.firebasedatabase.app/recipe-shop-Angular/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new recipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(recipe.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([_, recipesState]) => {
      return this.http.put(
        'https://udemy-37087-default-rtdb.asia-southeast1.firebasedatabase.app/recipe-shop-Angular/recipes.json',
        recipesState.recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
