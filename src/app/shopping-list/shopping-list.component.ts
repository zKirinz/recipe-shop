import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  editingItemIndex!: number;
  private subscription!: Subscription;
  editingMode = false;
  modeSubscription!: Subscription;
  corresponsingRecipes: Recipe[] = [];
  mobile = false;
  showCorresponsingRecipes = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingredients;
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.modeSubscription = this.shoppingListService.modeChanged.subscribe(
      (mode) => {
        this.editingMode = mode;
      }
    );
    this.mobile = screen.width <= 767;
  }

  onEditItem(index: number) {
    this.showCorresponsingRecipes = false;
    this.shoppingListService.startedEditing.next(index);
    this.editingItemIndex = index;
    let recipes = this.recipeService.getRecipes();
    setTimeout(() => {
      this.corresponsingRecipes = [];
      for (let recipe of recipes) {
        for (let ingredient of recipe.ingredients) {
          if (
            ingredient.name === this.ingredients[this.editingItemIndex].name
          ) {
            this.corresponsingRecipes.push(recipe);
            break;
          }
        }
      }
      this.showCorresponsingRecipes = true;
    }, 250);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.modeSubscription.unsubscribe();
  }

  resetCorrespondingRecipes() {
    this.corresponsingRecipes = [];
  }
}
