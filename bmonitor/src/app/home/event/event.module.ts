import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    EventComponent,
    ConversationComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
