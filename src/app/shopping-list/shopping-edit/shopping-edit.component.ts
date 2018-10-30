import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  //@ViewChild('nameInput') nameInputRef: ElementRef;
  //@ViewChild('amountInput') amountInputRef: ElementRef;
  private subscription: Subscription; //Atraves de ella hacer la subscripcion y en automatico se desubscribe
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  editMode = false;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.subscription = this.ingredientsService.startedEditing.subscribe( (index: number) => {
      this.editedItem = this.ingredientsService.getIngredient(index);
      this.editMode = true;
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(form: NgForm){
    /*const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;*/
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.ingredientsService.addIngredient(newIngredient);
  }
} 