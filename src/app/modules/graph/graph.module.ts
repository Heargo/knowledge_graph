import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { AnimatedListComponent } from './animated-list/animated-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GraphPageComponent, AnimatedListComponent],
  imports: [CommonModule, GraphRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraphModule {}
