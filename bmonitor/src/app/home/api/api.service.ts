import { Injectable } from '@angular/core';
import { Apollo, Query, gql } from 'apollo-angular';
import {map} from 'rxjs/operators';

const GET_VERSION = gql`
  query getVersion {
     getVersion {
      code
      error
      result {
        description
      }
    }
  }
`;
const GET_ALL_VENUES = gql`
  query getAllVenues {
    getAllVenues {
    code
    result {
      venues {
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
export class ApiService {
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
  loadMenu() {
   /* const result = this.apollo.query<any>({
      query: GET_ALL_VENUES
    }).pipe(map((data) => data));

    result.subscribe((res) => {
      const { data } = res;
      const { getAllVenues } = data;
      console.log('>> VENUES', getAllVenues.result)
    })*/
    const user = [
      {path: 'Overview', url: './user/overview'},
      {path: 'LeaderBoard', url: './user'},
      {path: 'Add User' , url: './user'}
    ];
    const profile = [
      {path: 'Profile' },
      {path: 'Connections' }
    ];
    const authentication = [
      {path: 'Log In', url: './authentication/login' },
      {path: 'Sign Up', url: './authentication/login' },
      {path: 'Email Verification', url: './authentication/email' },
      {path: '2-step Verification', url: './authentication/twoostep' }
    ];
    const dashboard = [
      {path: 'Default', url: './dashboard/default' },
      {path: 'Analytics', url: './dashboard/analytics' },
      {path: 'E Commerce', url: './dashboard/ecommerce'  },
    ];
    const chat = [
      {path: 'Inbox', url: './chat' },
      {path: 'conversation', url: './conversation' },
      {path: 'notification', url: './notification' },
    ];
    const venue = [
      { path: 'Venue List', url: './venuelist'},
      { path: 'Venue detail', url: './venuedetails'}
    ]
    return {
      user, profile, authentication, dashboard, chat, venue
    }
  }

  async loadServices() {
    const data =  [
      { path: 'Discovery', url: '' },
      { path: 'Sms', url: '' },
      { path: 'Venue', url: '' },
      { path: 'Notification', url: '' },
      { path: 'Inbox', url: '' },
      { path: 'Reminder', url: '' },
      { path: 'LatLong', url: '' },
      { path: 'History', url: '' },
      { path: 'DataProvider', url: '' },
      { path: 'Search', url: '' },
      { path: 'Scheduler', url: '' },
    ];
    const sortBy = (a: any, b: any) => {
      if (a.path < b.path) return -1 ;
      if (a.path > b.path  ) return 1;
      return 0;
    }
    data.sort(sortBy);
    return data;
  }
  async loadInbox() {
    const data =  [
      { path: 'John', url: '' },
      { path: 'Gaile', url: '' },
      { path: 'Richard', url: '' },
      { path: 'Isabelle', url: '' },
      { path: 'Chris', url: '' },
    ];
    const sortBy = (a: any, b: any) => {
      if (a.path < b.path) return -1 ;
      if (a.path > b.path  ) return 1;
      return 0;
    }
    data.sort(sortBy);
    return data;
  }
  async loadTopPanel() {
    return [
      {name: 'Subscribers', total: 1000, color: 'icon-primary', icon: 'fa fa-users' },
      {name: 'New', total: 16, color: 'icon-secondary', icon: 'fa fa-user'  },
      {name: 'Active', total: 455, color: 'icon-success', icon: 'fa fa-comments'  },

      {name: 'Cancel', total: 44, color: 'icon-danger' , icon: 'fa fa-ban' },
      {name: 'Pending', total: 55, color: 'icon-info', icon: 'fa fa-eye'  },

      {name: 'Inactive', total: 66, color: 'icon-default', icon: 'fa fa-times'  }
    ]
  }
}
