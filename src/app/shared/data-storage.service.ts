import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://udemy-37087-default-rtdb.asia-southeast1.firebasedatabase.app/recipe-shop-Angular/recipes.json',
        recipes
      )
      .subscribe(() => {
        console.log('Stored new recipe successfully!');
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://udemy-37087-default-rtdb.asia-southeast1.firebasedatabase.app/recipe-shop-Angular/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
