import { Injectable } from '@angular/core';
import { GameGraph, Ontology } from '../models/graph.models';
import * as jsonData from '../../../../assets/json/data.json';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private _graphData: GameGraph;

  constructor() {
    //load json from assets
    this._graphData = jsonData;
  }

  getGames() {
    return this._graphData.games;
  }

  getGamesFromSub(sub: Ontology) {
    //get all the games from a subcategory
    let games: string[] = [];
    if (sub.games) {
      games = games.concat(sub.games);
    }
    if (sub.subs) {
      sub.subs.forEach(subsub => {
        games = games.concat(this.getGamesFromSub(subsub));
      });
    }
    return games;
  }

  getCategories(subs: Ontology[] = this._graphData.ontology.subs) {
    //for each subcategory, get the name and all the game in subcategories
    let categories: any[] = [];

    for (let sub of subs) {
      categories.push({
        name: sub.name,
        games: this.getGamesFromSub(sub),
      });
      if (sub.subs) {
        categories = categories.concat(this.getCategories(sub.subs));
      }
    }

    return categories;
  }
}
