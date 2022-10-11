import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VenueComponent} from './venue.component';
import {VenueDetailComponent} from './venue-detail/venue-detail.component';
import {BrowseComponent} from './browse/browse.component';
import {CommonModule} from '@angular/common';
import {BarComponent} from './bar/bar.component';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {GridComponent} from './grid/grid.component';
import {ListComponent} from './list/list.component';
import { VenueGroupsComponent } from './venue-groups/venue-groups.component';
import { AllVenuesComponent } from './all-venues/all-venues.component';


const routes: Routes = [
  {
    path: '', component: VenueComponent, children: [
      { path:'grid', component: GridComponent },
      { path:'list', component: ListComponent },
      { path:'detail', component: VenueDetailComponent },
      { path:'bar', component: BarComponent },
      { path:'restaurant', component: RestaurantComponent },
      { path:'all-venues', component: AllVenuesComponent },
      { path:'venue-groups', component: VenueGroupsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenueRoutingModule { }
