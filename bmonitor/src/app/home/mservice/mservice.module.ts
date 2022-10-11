import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MserviceRoutingModule } from './mservice-routing.module';
import { MserviceComponent } from './mservice.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { OverviewComponent } from './overview/overview.component';
import {PanelAsideComponent} from '../panel-aside/panel-aside.component';


@NgModule({
  declarations: [
    MserviceComponent,
    DiscoveryComponent,
    OverviewComponent,
    PanelAsideComponent,

  ],
  exports: [
    PanelAsideComponent
  ],
  imports: [
    CommonModule,
    MserviceRoutingModule,
  ]
})
export class MserviceModule { }
