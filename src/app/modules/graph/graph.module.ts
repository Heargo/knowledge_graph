import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { AnimatedListComponent } from './animated-list/animated-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchPageComponent } from './search-page/search-page.component';
import { VariationPageComponent } from './variation-page/variation-page.component';
import { CocktailCardComponent } from './cocktail-card/cocktail-card.component';
import { CleanValuePipe } from './pipes/cleanValue.pipe';
import { TagSelectorComponent } from './tag-selector/tag-selector.component';

@NgModule({
  declarations: [
    GraphPageComponent,
    AnimatedListComponent,
    SearchPageComponent,
    VariationPageComponent,
    CocktailCardComponent,
    TagSelectorComponent,
  ],
  imports: [CommonModule, GraphRoutingModule, SharedModule, CleanValuePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraphModule {}
