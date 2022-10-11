import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from './chat.component';
import {ConversationComponent} from './conversation/conversation.component';
import {MessagesComponent} from './messages/messages.component';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {DateComponent} from '../connection/date/date.component';

const routes: Routes = [
  {
    path:'', component: ChatComponent, children: [
      { path: 'conversation',component: ConversationComponent},
      { path: 'messages',component: MessagesComponent},
      { path: 'overview',component: OverviewComponent},
      { path: 'date',component: DateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
