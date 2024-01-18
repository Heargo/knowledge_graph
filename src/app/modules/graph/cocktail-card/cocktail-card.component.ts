import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/graph.models';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
})
export class CocktailCardComponent extends BaseAppComponent {
  @Input() cocktail!: Cocktail;

  // constructor(private readonly graphService: GraphService) {
  //   super();
  // }

  // ngOnInit() {
  //   this.cocktailsCategories = Object.keys(this.cocktail.ingredients);
  // }
}
