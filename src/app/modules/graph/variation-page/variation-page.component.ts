import { Component, OnInit } from '@angular/core';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { Cocktail } from '../models/graph.models';
import { GraphService } from '../services/graph.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-variation-page',
  templateUrl: './variation-page.component.html',
  styleUrls: ['./variation-page.component.scss'],
})
export class VariationPageComponent extends BaseAppComponent implements OnInit {
  cocktail!: Cocktail;
  newCocktail!: Cocktail;

  creationForm!: FormGroup;

  ingredientToChange = {
    alcool: 1,
    soft: 1,
    side: 1,
    variation: 0,
  };

  constructor(
    private readonly graphService: GraphService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.cocktail = this.graphService.getRandomCocktail();
    this.creationForm = this.formBuilder.group({
      variationIntensity: [0, [Validators.required]],
      alcool: [0, [Validators.required]],
      soft: [0, [Validators.required]],
      side: [0, [Validators.required]],
      variation: [0, [Validators.required]],
    });
  }

  pickNewRandomCocktail() {
    this.cocktail = this.graphService.getRandomCocktail();
  }

  generateNewRandomCocktail() {
    //update values in form
    this.creationForm.patchValue({
      variationIntensity: Math.random(),
      alcool: Math.round(Math.random() * 3),
      soft: Math.round(Math.random() * 3),
      side: Math.round(Math.random() * 3),
      variation: Math.round(Math.random() * 3),
    });
    this.generateNewCocktail();
  }

  generateNewCocktail() {
    const vals = this.creationForm.value;
    this.newCocktail = this.graphService.createRandomCocktailVariant(
      this.cocktail,
      vals.variationIntensity,
      {
        alcool: vals.alcool,
        soft: vals.soft,
        side: vals.side,
        variation: vals.variation,
      }
    );
  }
}
