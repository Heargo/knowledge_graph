import { Injectable } from '@angular/core';
import { GameGraph, Ontology, TextInfo } from '../models/graph.models';
import * as jsonData from '../../../../assets/json/data.json';
import { HttpClient } from '@angular/common/http';
import { filter, firstValueFrom, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private graphData: GameGraph;
  private textData: TextInfo[] = [];

  constructor(private readonly httpClient: HttpClient) {
    //load json from assets
    this.graphData = jsonData;
  }

  getGames() {
    return this.graphData.games;
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

  getCategories(subs: Ontology[] = this.graphData.ontology.subs) {
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

  async parseText() {
    //texts are split by "------"
    const textData$ = this.httpClient
      .get('assets/json/allTexts.txt', { responseType: 'text' })
      .pipe(
        take(1),
        map((data: string) => {
          const texts = data.split(
            '-------------------------------------------------------------------------------------------------------------------------'
          );
          return texts;
        }),
        map((texts: string[]) => {
          //filter all text that are not "" or only -
          let res = texts.filter(
            text => text.trim() !== '' && text.trim() !== '-'
          );
          //remove all \n in texts
          res = res.map(text => text.replace(/\n/g, ''));
          return res;
        })
      );
    let textes = await firstValueFrom(textData$);
    console.log(textes);

    //for each category, look if it's in the text and calculate the accuracy
    const categories = this.getCategories();
    console.log(categories);
    for (let text of textes) {
      const textCategories: any[] = [];
      for (let category of categories) {
        const regex = new RegExp(category.name, 'gi');
        const matches = text.match(regex);
        if (matches) {
          textCategories.push({
            name: category.name,
            accuracy: matches.length * 0.2,
          });
        }
      }
      this.textData.push({
        text: text,
        categories: textCategories,
      });
    }
    console.log(this.textData);
  }
}
