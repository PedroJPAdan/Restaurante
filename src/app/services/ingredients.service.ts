import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class IngredientsService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient [] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Apples', 3)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.emit(this.ingredients.slice());
      }
}