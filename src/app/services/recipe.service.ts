import { Recipe } from "../recipes/recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A test recipe 1', 'This is a simply test ', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg', 
    [
        new Ingredient('bread', 2),
        new Ingredient('tomatoes', 3)
    ]),
        new Recipe('A test recipe 2', 'This is a simply test', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg',
        [
            new Ingredient('Beef', 3),
            new Ingredient('garlic', 1)
        ]),
        new Recipe('A test recipe 3', 'This is a simply test', 'http://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2017/09/1996x1206-hamburguesas.jpg',
        [
            new Ingredient('Sauce', 2),
        ])
    ];
      getRecipes(){
          return this.recipes.slice();
      }
}