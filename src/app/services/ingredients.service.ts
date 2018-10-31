import { Ingredient } from "../shared/ingredient.model";
//import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class IngredientsService {
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>(); //indicar la edicion de algun ingrediente
    
    private ingredients: Ingredient [] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Apples', 3),
        new Ingredient('Fish', 7)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      //Una vez obtenidos se deben guardar en el arreglo, con un foreach donde se obtiene el objeto con una constante i
      addIngredients(auxIngredients: Ingredient[]){
        for(const i of auxIngredients){
            var auxAmount = this.ingredients.find(ingrediente => ingrediente.name === i.name);
            if(auxAmount){
                auxAmount.amount += i.amount;
            }else{
                this.ingredients.push(i);
            }
        }
        //Una vez esto se volvera a ejecutar el evento con el emitter
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}