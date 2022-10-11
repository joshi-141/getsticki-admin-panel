import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection.component';
import { OverviewComponent } from './overview/overview.component';
import { ChatComponent } from './chat/chat.component';
import { DateComponent } from './date/date.component';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-users/all-users.component';
import { MatchesComponent } from './matches/matches.component';
import { VenueComponent } from '../venue/venue.component';
import { BlockedReportedComponent } from './blocked-reported/blocked-reported.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InterestgroupsComponent } from './interestgroups/interestgroups.component';

const routes: Routes = [
  {
    path: '', component: ConnectionComponent, children: [
      { path: 'chat', component: ChatComponent },
      { path: 'date', component: DateComponent },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'venues', component: VenueComponent },
      { path: 'blocked-reported', component: BlockedReportedComponent },
      { path: 'feedback', component:FeedbackComponent },
      { path: 'interestgroups', component:InterestgroupsComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ConnectionRoutingModule { }
