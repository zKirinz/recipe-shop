import { Component, ElementRef } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  scrollToElement($element: any): void {
    if (screen.width <= 767) {
      $element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      let headerOffset = 87;
      let elementPosition = $element.getBoundingClientRect().top;
      if (headerOffset == elementPosition) {
        headerOffset = elementPosition - headerOffset;
      }
      window.scrollTo({
        top: headerOffset,
        behavior: 'smooth',
      });
    }
  }
}
