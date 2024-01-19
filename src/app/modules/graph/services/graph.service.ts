import { Injectable } from '@angular/core';
import {
  AlcoolRaw,
  BartenderGraph,
  Cocktail,
  Taste,
} from '../models/graph.models';
import * as jsonData from '../../../../assets/json/alchool.json';
import { HttpClient } from '@angular/common/http';
import { IngredientToChange } from '../models/dto.models';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private graphData: BartenderGraph;

  constructor(private readonly httpClient: HttpClient) {
    //load json from assets
    this.graphData = jsonData;
  }

  private walk(
    o: any,
    func: (key: any, value: any, nesting: string) => void,
    nesting: string = ''
  ) {
    for (var i in o) {
      func.apply(this, [i, o[i], nesting]);
      if (o[i] !== null && typeof o[i] == 'object') {
        //going one step down in the object tree!!
        this.walk(o[i], func, nesting + (nesting === '' ? '' : ' ') + i);
      }
    }
  }
  private pushUnique(array: any[], item: any) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  getAllIngredients() {
    const ingredients: string[] = [];

    // sides
    for (const [key, value] of Object.entries(this.graphData.sideIngredients)) {
      this.pushUnique(ingredients, key);
      if (typeof value === 'string') {
        this.pushUnique(ingredients, value);
      } else {
        value.forEach((item: string) => {
          this.pushUnique(ingredients, item);
        });
      }
    }

    // alcool
    for (const type of ['low', 'medium', 'high'] as (keyof AlcoolRaw)[]) {
      this.walk(
        this.graphData.drinks.alcool.raw[type],
        (key: string, value: any, nesting: string) => {
          if (ingredients.indexOf(key) === -1) {
            ingredients.push(nesting + (nesting === '' ? '' : ' ') + key);
          }

          // add string and array values
          if (typeof value === 'string') {
            this.pushUnique(
              ingredients,
              nesting + (nesting === '' ? '' : ' ') + value
            );
          } else if (Array.isArray(value)) {
            value.forEach((item: string) => {
              this.pushUnique(
                ingredients,
                nesting + (nesting === '' ? '' : ' ') + item
              );
            });
          }
        }
      );
    }
    return ingredients;
  }

  getCocktail(name: string) {
    return this.graphData.drinks.alcool.mixed.cocktails.filter(cocktail => {
      return cocktail.name === name;
    });
  }

  getRandomCocktail() {
    return this.graphData.drinks.alcool.mixed.cocktails[
      Math.round(
        Math.random() * this.graphData.drinks.alcool.mixed.cocktails.length
      )
    ];
  }

  getCocktailByIngredient(ingredient: string) {
    return this.graphData.drinks.alcool.mixed.cocktails.filter(cocktail => {
      return (
        cocktail.ingredients.alcool.includes(ingredient) ||
        cocktail.ingredients.soft.includes(ingredient) ||
        cocktail.ingredients.side.includes(ingredient)
      );
    });
  }

  getCocktailByGlass(glass: string) {
    return this.graphData.drinks.alcool.mixed.cocktails.filter(cocktail => {
      return cocktail.glass === glass;
    });
  }

  getCocktailByObject(object: string) {
    return this.graphData.drinks.alcool.mixed.cocktails.filter(cocktail => {
      return cocktail.objects.includes(object);
    });
  }

  getCocktailByTaste(taste: Taste, maxDiff: number) {
    return this.graphData.drinks.alcool.mixed.cocktails.filter(cocktail => {
      return (
        Math.abs(cocktail.taste.bitter - taste.bitter) <= maxDiff &&
        Math.abs(cocktail.taste.sour - taste.sour) <= maxDiff &&
        Math.abs(cocktail.taste.spiced - taste.spiced) <= maxDiff &&
        Math.abs(cocktail.taste.sweet - taste.sweet) <= maxDiff
      );
    });
  }

  ingredientOverlap(cocktail1: Cocktail, cocktail2: Cocktail): string[] {
    const overlap = cocktail1.ingredients.alcool.filter(ingredient => {
      return cocktail2.ingredients.alcool.includes(ingredient);
    });
    //add soft ingredients
    cocktail1.ingredients.soft.forEach(ingredient => {
      if (cocktail2.ingredients.soft.includes(ingredient)) {
        overlap.push(ingredient);
      }
    });
    //add side ingredients
    cocktail1.ingredients.side.forEach(ingredient => {
      if (cocktail2.ingredients.side.includes(ingredient)) {
        overlap.push(ingredient);
      }
    });
    return overlap;
  }

  getClosestCocktails(cocktail: Cocktail) {
    const sortedByIngredient =
      this.graphData.drinks.alcool.mixed.cocktails.sort((a, b) => {
        return (
          this.ingredientOverlap(cocktail, a).length -
          this.ingredientOverlap(cocktail, b).length
        );
      });
    return sortedByIngredient;
  }

  replaceElementFromList(listA: any[], listB: any[], nbElements: number) {
    const newList = [...listA];

    //take nbElements from listB
    const elementsToTake = listB
      .sort(() => Math.random() - Math.random())
      .slice(0, nbElements);

    //delete nbElements from newList
    newList.sort(() => Math.random() - Math.random()).splice(0, nbElements);

    //add elementsToTake to newList
    newList.push(...elementsToTake);
    console.log('old list', listA, 'merged with', listB, 'new list', newList);
    return newList;
  }

  generateName(name1: string, name2: string) {
    //mix half of name1 with half of name2
    return name1.slice(0, name1.length / 2) + name2.slice(name2.length / 2);
  }

  createRandomCocktailVariant(
    cocktail: Cocktail,
    variationIntensity: number,
    ingredientToChange: IngredientToChange
  ) {
    //take inspiration from closest cocktail and change some ingredients
    const closestCocktails = this.getClosestCocktails(cocktail);

    //take cocktail from the closestCocktails array based on variationIntensity (0 is the closest and 1 is the farest)
    const cocktailInspiration =
      closestCocktails[
        Math.round(closestCocktails.length * variationIntensity)
      ];

    //create a copy of the cocktail
    const newCocktail = JSON.parse(JSON.stringify(cocktail));
    newCocktail.name = this.generateName(
      cocktail.name,
      cocktailInspiration.name
    );
    newCocktail.ingredients.alcool = this.replaceElementFromList(
      newCocktail.ingredients.alcool,
      cocktailInspiration.ingredients.alcool,
      ingredientToChange.alcool + Math.random() * ingredientToChange.variation
    );

    newCocktail.ingredients.soft = this.replaceElementFromList(
      newCocktail.ingredients.soft,
      cocktailInspiration.ingredients.soft,
      ingredientToChange.soft + Math.random() * ingredientToChange.variation
    );

    newCocktail.ingredients.side = this.replaceElementFromList(
      newCocktail.ingredients.side,
      cocktailInspiration.ingredients.side,
      ingredientToChange.side + Math.random() * ingredientToChange.variation
    );

    return newCocktail;
  }
}
