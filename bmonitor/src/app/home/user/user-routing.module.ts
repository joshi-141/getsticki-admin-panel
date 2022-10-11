import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user.component';
import {UseroverviewComponent} from './useroverview/useroverview.component';
import {DefaultComponent} from './default/default.component';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail/detail.component';
import { ReleasesComponent } from './releases/releases.component';
import { VenueReportsComponent } from './venue-reports/venue-reports.component';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { OtherComponent } from './other/other.component';

const routes: Routes = [
  {
    path: '', component: UserComponent ,  children: [
      { path: 'releases',  component: ReleasesComponent},
      { path: 'venue-reports',  component: VenueReportsComponent},
      { path: 'user-reports',  component: UserReportsComponent},
      { path: 'other',  component: OtherComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class UserRoutingModule { }
