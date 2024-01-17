export interface BartenderGraph {
  drinks: Drinks;
  object: Objects;
  sideIngredients: SideIngredients;
}

export interface Drinks {
  soft: Soft;
  alcool: Alcool;
}

export interface Alcool {
  raw: AlcoolRaw;
  mixed: Mixed;
}

export interface Mixed {
  cocktails: Cocktail[];
  arranged: Arranged;
}

export interface Arranged {
  rhum: string[];
  vodka: string[];
}

export interface Cocktail {
  name: string;
  ingredients: Ingredients;
  glass: string;
  objects: string[];
  taste: Taste;
}

export interface Ingredients {
  alcool: string[];
  soft: string[];
  side: string[];
}

export interface Taste {
  sweet: number;
  bitter: number;
  sour: number;
  spiced: number;
}

export interface AlcoolRaw {
  low: Low;
  medium: Medium;
  high: High;
}

export interface High {
  spirit: Spirit;
  fortifiedWine: FortifiedWine;
}

export interface FortifiedWine {
  vermouth: string[];
  porto: string[];
  sherry: string[];
}

export interface Spirit {
  vodka: string[];
  gin: string[];
  rum: string[];
  tequila: string[];
  whisky: string[];
  cognac: string[];
  liqueur: string[];
}

export interface Low {
  beer: Beer;
  cider: Cider;
}

export interface Beer {
  light: BeerSubType;
  IPA: BeerSubType;
  dark: Dark;
}

export interface BeerSubType {
  blanche: string[];
  blonde: string[];
  rousse: string[];
}

export interface Dark {
  brown: string[];
  stout: string[];
}

export interface Cider {
  soft: string[];
  brut: string[];
}

export interface Medium {
  wine: Wine;
}

export interface Wine {
  white: WineSubType;
  red: WineSubType;
  rose: WineSubType;
}

export interface WineSubType {
  dry: string[];
  sweet: string[];
}

export interface Soft {
  sirops: string[];
  jus: string[];
  soda: string[];
}

export interface Objects {
  container: Container;
  nonContainer: NonContainer;
}

export interface Container {
  mixer: string[];
  serving: string[];
  doser: string[];
}

export interface NonContainer {
  mixer: string[];
  serving: string[];
  tools: string[];
}

export interface SideIngredients {
  decoration: string[];
  sweetener: string[];
  bitter: string[];
  sour: string[];
  spice: string[];
  fruit: string[];
  herb: string[];
  other: string[];
}
