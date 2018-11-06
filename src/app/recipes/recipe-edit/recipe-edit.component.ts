import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = /*convertir a numero +*/ +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName = '';
    let recipeImgePath = '';
    let recipeDescription = '';
    const ingredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(const ingredient of recipe.ingredients){
          ingredients.push(new FormGroup({
            'name':new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }

      this.recipeForm = new FormGroup({
        'name':new FormControl(recipeName),
        'imagePath':new FormControl(recipeImgePath),
        'description':new FormControl(recipeDescription),
        'ingredients':ingredients
      });
    }  
  }
}
