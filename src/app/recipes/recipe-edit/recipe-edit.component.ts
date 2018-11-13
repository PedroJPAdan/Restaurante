import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

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
            'name':new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }

      this.recipeForm = new FormGroup({
        'name':new FormControl(recipeName, Validators.required),
        'imagePath':new FormControl(recipeImgePath, Validators.required),
        'description':new FormControl(recipeDescription, Validators.required),
        'ingredients':ingredients
      });
    }  
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push( new FormGroup({ //Del formulario obtenemos el elemento ingredients
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onSubmit(){
    //const newRecipe = new Recipe(this.recipeForm);
    console.log(this.recipeForm);
  }
}
