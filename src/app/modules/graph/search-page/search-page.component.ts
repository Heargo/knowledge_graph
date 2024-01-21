import { Component } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Cocktail } from '../models/graph.models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  protected searchResults: Cocktail[] = [];
  protected ingredients: string[] = [];

  constructor(private readonly graphService: GraphService) {
    this.ingredients = graphService.getAllIngredients();
    console.log(this.ingredients);
  }

  getByIngredients(ingredients: string[]) {
    const cocktails: Cocktail[] = [];
    // First selection : cocktails with at least one ingredient
    const candidates = ingredients
      .map(ing => this.graphService.getCocktailByIngredient(ing))
      .flat()
      // remove duplicates
      .reduce((acc: Cocktail[], val) => {
        if (!acc.includes(val)) {
          acc.push(val);
        }
        return acc;
      }, []);
    // cocktails must have all ingredients (AND)
    return candidates.filter(c => {
      return ingredients
        .map(ing => {
          return this.graphService.cocktailContainsIngredient(c, ing);
        })
        .every(b => b);
    });
  }

  onIngredientSelect(ingredients: any) {
    // get ingredients required in option
    const ings = ingredients;
    this.searchResults = this.getByIngredients(ings);
  }
}
