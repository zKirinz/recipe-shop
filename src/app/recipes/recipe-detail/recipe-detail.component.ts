import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  scrollToElement($element: HTMLElement): void {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  onEditRecipe($element: HTMLElement) {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    if (screen.width <= 767) {
      this.scrollToElement($element);
    } else {
      this.scrollTo();
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  scrollTo(): void {
    var headerOffset = 87;
    window.scrollTo({
      top: headerOffset,
      behavior: 'smooth',
    });
  }

  deleteScrollTo(): void {
    if (screen.width > 767) {
      var headerOffset = 87;
      window.scrollTo({
        top: headerOffset,
        behavior: 'smooth',
      });
    }
  }
}
