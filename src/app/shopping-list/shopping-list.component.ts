import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient [];
  private subscription: Subscription;

  constructor(private ingredientsService: IngredientsService) { }

  /*ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
    this.ingredientsService.ingredientsChanged
    .subscribe(
      ((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
    );
  }*/

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
    this.subscription = this.ingredientsService.startedChanged.subscribe( (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.ingredientsService.startedEditing.next(index); //mandar el valor del ingrediente que quiero editar
  }
}
