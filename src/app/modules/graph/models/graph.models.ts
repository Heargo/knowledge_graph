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

export interface TextInfo {
  text: string;
  categories: TextCategory[];
}

export interface TextCategory {
  name: string;
  accuracy: number;
}
