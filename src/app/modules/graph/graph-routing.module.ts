import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { VariationPageComponent } from './variation-page/variation-page.component';

const routes: Routes = [
  { path: '', component: GraphPageComponent },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'variation',
    component: VariationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphRoutingModule {}
