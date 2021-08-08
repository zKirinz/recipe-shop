import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  noOfRecipes!: number;
  subscription!: Subscription;
  animate = false;
  mobile = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes) => {
        this.noOfRecipes = recipes.length;
      }
    );
    if (screen.width >= 768) {
      this.animate = true;
      this.mobile = true;
    }
  }

  onWindowScroll() {
    this.animate = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
