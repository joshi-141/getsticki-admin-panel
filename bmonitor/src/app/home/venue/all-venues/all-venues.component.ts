import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../api/venue.service';

@Component({
  selector: 'app-all-venues',
  templateUrl: './all-venues.component.html',
  styleUrls: ['./all-venues.component.css']
})
export class AllVenuesComponent implements OnInit {

  public display: number = 1;
   venues: any = [];
   queryParams: any = { skip: 0, take: 10, searchingFilter : null, sorting : null, dietaryFilter : null, categoryFilter : null};
   endofPage: boolean = false;
  constructor(private venueService: VenueService) { }

  async ngOnInit() {
      await this.mainfunction(this.queryParams);
  }
  async onScroll() {
    if (!this.endofPage) {
      this.queryParams.skip = this.queryParams.skip
        ? this.queryParams.skip +
        (this.queryParams.take ? this.queryParams.take : 10)
        : 10;
      await this.venueService.loadVenues( this.queryParams,(data) => {
        const entries = Object.values(data.data);
        data.data.length > 0 ? this.venues.push(...entries) : this.endofPage = true
      });
    }
  }
  async mainfunction(queryParams: any) {
    await this.venueService.loadVenues(queryParams,(data) => {
      this.venues = Object.values(data.data);
    });
  }

  changeDisplay(mode: number): void {
    this.display = mode;
  }
  searchText(data: any){
    if(data != ''){
     this.queryParams.searchingFilter = `name : "${data}"`;
     this.mainfunction(this.queryParams); 
    }
  }
  dietaryfilter(column : any, values : any){

     this.queryParams.dietaryFilter = values.target.value != "" ? `${column} : ["${values.target.value}"]` : '';
     this.mainfunction(this.queryParams);    
    
  }
  sort(data : any){
     const value = data.target.value.split(".");
     this.queryParams.sorting = value[1] ? `["${value[0]} ${value[1]}"] ` : '';
     this.mainfunction(this.queryParams);
  }
  categoryFilter(column : any, values : any){

     this.queryParams.categoryFilter = values.target.value != "" ? `${column} : ["${values.target.value}"]` : '';
     this.mainfunction(this.queryParams);    
    
  }
}