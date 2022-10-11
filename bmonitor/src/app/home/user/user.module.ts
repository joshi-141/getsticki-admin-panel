import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';
import { DefaultComponent } from './default/default.component';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { DetailComponent } from './detail/detail.component';
import { ReleasesComponent } from './releases/releases.component';
import { VenueReportsComponent } from './venue-reports/venue-reports.component';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { OtherComponent } from './other/other.component';


@NgModule({
  declarations: [
    UserComponent,
    UseroverviewComponent,
    DefaultComponent,
    CardProfileComponent,
    DetailComponent,
    ReleasesComponent,
    VenueReportsComponent,
    UserReportsComponent,
    OtherComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
