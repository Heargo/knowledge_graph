import { Component } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Ingredients } from '../models/graph.models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  protected ingredients: string[] = [];
  constructor(private readonly graphService: GraphService) {
    this.ingredients = graphService.getAllIngredients();
  }

  //WIP
  getByIngredients(ingredients: string[]) {
    ingredients.forEach(ingredient => {
      this.graphService.getCocktailByIngredient(ingredient);
    });
  }
}
