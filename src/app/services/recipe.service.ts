import { Recipe } from "../recipes/recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { IngredientsService } from "./ingredients.service";


@Injectable() // Decorador para poder agregar un servicio dentro de otro
export class RecipeService {
    //recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A test recipe 1', 'This is a simply test ', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg', 
    [
        new Ingredient('Apples', 2),
        new Ingredient('Tomatoes', 3)
    ]),
        new Recipe('A test recipe 2', 'This is a simply test', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg',
        [
            new Ingredient('Beef', 3),
            new Ingredient('Fish', 1),
            new Ingredient('Tomatoes', 2)
        ]),
        new Recipe('A test recipe 3', 'This is a simply test', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg',
        [
            new Ingredient('Sauce', 2),
            new Ingredient('Cheesse', 1),
            new Ingredient('Mole', 3)
        ])
    ];

    //Crear constructor para utilizar el ingredientsService
    constructor(private ingredientsService: IngredientsService){}

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      //Metodo para invocar desde la vista
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.ingredientsService.addIngredients(ingredients);
      }
}