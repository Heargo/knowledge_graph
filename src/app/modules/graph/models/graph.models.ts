export interface GameGraph {
  ontology: Ontology;
  games: GameList;
  texts: string[];
}

export interface Ontology {
  name: string;
  level: number;
  games: string[];
  subs: Ontology[];
}

export type GameList = { [key: string]: string[] };
