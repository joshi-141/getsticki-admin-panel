import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationComponent } from './conversation/conversation.component';
import { OverviewComponent } from './overview/overview.component';
import {MserviceModule} from '../mservice/mservice.module';



@NgModule({
  declarations: [
    ChatComponent,
    MessagesComponent,
    ConversationComponent,
    OverviewComponent,

  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MserviceModule
  ]
})
export class ChatModule { }
