import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Apollo, gql} from 'apollo-angular';
import { query } from '@angular/animations';


const getAllVenues = (dietary : any, order : any, category : any, searching : any) => gql`
query venueQuery($skip:Int!,$take:Int!){
  venueQuery(skip:$skip,take:$take
    ${dietary}
    ${order}
    ${category}
    ${searching}
    ) {
    code
    error
    data
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private apollo: Apollo) { }
  async loadVenues(queryParams : any, cb: (x: any) => any) {

    
    const dietary =  queryParams.dietaryFilter ? queryParams.dietaryFilter :  '';
    const category = queryParams.categoryFilter ? queryParams.categoryFilter  : '';  
    const searching = dietary || category ? queryParams.searchingFilter ? queryParams.searchingFilter : '' : queryParams.searchingFilter ? `dietary : [] ${queryParams.searchingFilter}` : '';

    const order = queryParams.sorting ? `order : ${queryParams.sorting}`:'';
    const query = this.apollo.query<any>({
      query: getAllVenues(dietary,order,category,searching),
      variables: {
        skip: queryParams.skip,
        take: queryParams.take,
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => { 
      const { data } = res;
      const { venueQuery } = data;
      cb(venueQuery);
    })
  }
}