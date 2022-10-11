import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from './event.component';
import {ConversationComponent} from './conversation/conversation.component';
import {NotificationComponent} from './notification/notification.component';

const routes: Routes = [
  {
    path: '', component: EventComponent, children: [
      { path: 'conversation', component: ConversationComponent},
      { path: 'notification', component: NotificationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
