import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionComponent } from './connection.component';
import { OverviewComponent } from './overview/overview.component';
import { ChatComponent } from './chat/chat.component';
import {MserviceModule} from '../mservice/mservice.module';
import { DateComponent } from './date/date.component';
import {VenueModule} from '../venue/venue.module';
import {PanelGridComponent} from '../common/panel-grid/panel-grid.component';
import {PanelTopComponent} from '../common/panel-top/panel-top.component';
import {PanelChatComponent} from '../common/panel-chat/panel-chat.component';
import {PanelDateComponent} from '../common/panel-date/panel-date.component';
import {PanelLeftComponent} from '../common/panel-left/panel-left.component';
import {PanelRightComponent} from '../common/panel-right/panel-right.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { MatchesComponent } from './matches/matches.component';
import { VenuesComponent } from './venues/venues.component';
import { BlockedReportedComponent } from './blocked-reported/blocked-reported.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InterestgroupsComponent } from './interestgroups/interestgroups.component';






@NgModule({
  declarations: [
    ConnectionComponent,
    OverviewComponent,
    ChatComponent,
    DateComponent,
    PanelGridComponent,
    PanelTopComponent,
    PanelChatComponent,
    PanelDateComponent,
    PanelLeftComponent,
    PanelRightComponent,
    AllUsersComponent,
    MatchesComponent,
    VenuesComponent,
    BlockedReportedComponent,
    FeedbackComponent,
    InterestgroupsComponent,
  ],
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    MserviceModule,
    VenueModule,

  ]
})
export class ConnectionModule { }
