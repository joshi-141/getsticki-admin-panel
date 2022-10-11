import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueRoutingModule } from './venue-routing.module';
import { VenueComponent } from './venue.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { BrowseComponent } from './browse/browse.component';
import { BarComponent } from './bar/bar.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { GridComponent } from './grid/grid.component';
import {SpinnerComponent} from '../common/spinner/spinner.component';
import { ListComponent } from './list/list.component';
import {HomeModule} from '../home.module';
import { AllVenuesComponent } from './all-venues/all-venues.component';
import { VenueGroupsComponent } from './venue-groups/venue-groups.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    VenueComponent,
    VenueDetailComponent,
    BrowseComponent,
    BarComponent,
    RestaurantComponent,
    GridComponent,
    SpinnerComponent,
    ListComponent,
    AllVenuesComponent,
    VenueGroupsComponent,

  ],
  exports: [
    GridComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    VenueRoutingModule,
    HomeModule,
    InfiniteScrollModule
  ]
})
export class VenueModule { }
