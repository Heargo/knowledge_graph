import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { GameList } from '../models/graph.models';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent extends BaseAppComponent implements OnInit {
  games!: GameList;
  categories!: any[];

  constructor(private readonly graphService: GraphService) {
    super();
  }

  ngOnInit() {
    this.games = this.graphService.getGames();
    this.categories = this.graphService.getCategories();
    //sort by name
    this.categories.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    console.log(this.categories);
  }
}
