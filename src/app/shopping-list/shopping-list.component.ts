import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient [];
  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
    this.ingredientsService.ingredientsChanged
    .subscribe(
      ((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
    );
  }

}
