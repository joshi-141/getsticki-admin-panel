import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Apollo, gql} from 'apollo-angular';

const GET_ALL_VENUES = gql`
  query getAllVenues {
    getAllVenues {
    code
    result {
      venues {
        id
        name
        lat
        lng
        photo
        category
        rating
        jshours
        discount
        partner
        website
        state
        address
        phone
      }
    }
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
      query: GET_ALL_VENUES
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { getAllVenues } = data;
      cb(getAllVenues.result.venues);
    })
  }
}
