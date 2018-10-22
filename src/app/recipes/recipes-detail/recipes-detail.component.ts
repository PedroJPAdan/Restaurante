import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  //@Input() recipe: Recipe;
  recipe: Recipe;

  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { } //Con el constructor lo mando a llamar

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {this.id = +param['id']
    this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
