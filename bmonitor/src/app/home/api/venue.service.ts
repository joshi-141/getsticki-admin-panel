import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Apollo, gql} from 'apollo-angular';


const GET_ALL_VENUES = gql`
query dataQuery($skip:Int!,$take:Int!){
  dataQuery(table:"venue.b_venue.venue",skip:$skip,take:$take
    include : {venue_category :  { 
    include : { category_categoryTovenue_category : true } } },
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
  async loadVenues(cb: (x: any) => any) {
    const query = this.apollo.query<any>({
      query: GET_ALL_VENUES,
      variables: {
        skip: 10,
        take: 10,
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => { 
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }
}
