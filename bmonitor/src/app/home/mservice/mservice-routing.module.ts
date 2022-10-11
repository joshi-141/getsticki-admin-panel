import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MserviceComponent} from './mservice.component';
import {DiscoveryComponent} from './discovery/discovery.component';
import {OverviewComponent} from './overview/overview.component';

const routes: Routes = [
  {
    path: '', component: MserviceComponent, children: [
      { path:'overview', component: OverviewComponent },
      { path:'discovery', component: DiscoveryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MserviceRoutingModule { }
