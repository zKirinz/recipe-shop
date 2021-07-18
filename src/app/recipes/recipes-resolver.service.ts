import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { AppState } from '../store/app.reducer';
import { Recipe } from './recipe.model';
import recipesActions from './store';
import * as recipe from './store/recipe.constants';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve() {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new recipesActions.FetchRecipes());
          return this.actions$.pipe(ofType(recipe.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
