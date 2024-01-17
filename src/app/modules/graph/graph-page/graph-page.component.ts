import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { Cocktail } from '../models/graph.models';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent extends BaseAppComponent implements OnInit {
  cocktail!: Cocktail;
  newCocktail!: Cocktail;
  constructor(private readonly graphService: GraphService) {
    super();
  }

  ngOnInit() {
    this.cocktail = this.graphService.getRandomCocktail();
    this.newCocktail = this.graphService.createRandomCocktailVariant(
      this.cocktail,
      0.7,
      {
        alcool: 1,
        soft: 1,
        side: 1,
        variation: 1,
      }
    );
  }
}
