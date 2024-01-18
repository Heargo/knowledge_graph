import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { AnimatedListComponent } from './animated-list/animated-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchPageComponent } from './search-page/search-page.component';
import { VariationPageComponent } from './variation-page/variation-page.component';
import { CocktailCardComponent } from './cocktail-card/cocktail-card.component';

@NgModule({
  declarations: [GraphPageComponent, AnimatedListComponent, SearchPageComponent, VariationPageComponent, CocktailCardComponent],
  imports: [CommonModule, GraphRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraphModule {}
