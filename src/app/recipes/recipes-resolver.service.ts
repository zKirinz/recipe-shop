import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve() {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
