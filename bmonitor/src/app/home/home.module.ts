import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {CommonModule} from '@angular/common';

import {AuthenticationModule} from './authentication/authentication.module';
import {UserModule} from './user/user.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import {VenueModule} from './venue/venue.module';
import {MserviceModule} from './mservice/mservice.module';
import {ConnectionModule} from './connection/connection.module';
import { PanelListComponent } from './common/panel-list/panel-list.component';
import {PanelHeaderComponent} from './common/panel-header/panel-header.component';
import {FormsModule} from '@angular/forms';
import {PanelTableComponent} from './common/panel-table/panel-table.component';
@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    NavItemComponent,
    PanelListComponent,
    PanelHeaderComponent,
    PanelTableComponent,
  ],
  exports: [
    PanelListComponent,
    PanelHeaderComponent,
    PanelTableComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    AuthenticationModule,
    UserModule,
    MserviceModule,
    FormsModule
  ]

})
export class HomeModule { }
