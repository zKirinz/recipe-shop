import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  isEmpty: boolean = false;
  @Output('clearRequired') clearRequired = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.shoppingListService.modeChanged.next(this.editMode);
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
    this.isEmpty = this.shoppingListService.ingredients.length == 0;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateINgredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    this.isEmpty = this.shoppingListService.ingredients.length == 0;
    this.clearRequired.emit();
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
    this.shoppingListService.modeChanged.next(this.editMode);
    this.clearRequired.emit();
  }

  onDelete() {
    this.shoppingListService.deleteIngreident(this.editedItemIndex);
    this.isEmpty = this.shoppingListService.ingredients.length == 0;
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
