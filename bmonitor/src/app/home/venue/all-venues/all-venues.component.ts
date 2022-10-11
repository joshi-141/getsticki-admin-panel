import { Component, OnInit } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';

@Component({
  selector: 'app-all-venues',
  templateUrl: './all-venues.component.html',
  styleUrls: ['./all-venues.component.css']
})
export class AllVenuesComponent implements OnInit {

  public display: number = 1;
  venues: any = [];
  queryParams: any = { skip: 0, take: 10 };
  constructor(private venueService: VenueService) { }

  async ngOnInit() {
    const venuesCollection = await this.loadVenues();
    if (venuesCollection.venues) this.venues = venuesCollection.venues;
  }

  async loadVenues(queryParams?: any) {
    return await this.venueService.getAllVenue(queryParams);
  }

  async onScroll() {
    this.queryParams.skip = this.queryParams.skip
      ? this.queryParams.skip +
      (this.queryParams.take ? this.queryParams.take : 10)
      : 10;
    const venuesCollection: any = await this.loadVenues(
      this.queryParams,
    );

    if (venuesCollection.venues) this.venues.push(...venuesCollection.venues);
  }

  changeDisplay(mode: number): void {
    this.display = mode;
  }

}
