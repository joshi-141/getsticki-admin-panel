import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {Subscription} from 'rxjs';
import {VenueService} from '../../api/venue.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  inProgress: boolean | undefined;
  header: any[] | undefined;
  data: any[] | undefined;
  subscription: Subscription | undefined;
  constructor(private readonly storeService: StoreService,private readonly venueService: VenueService, private readonly router: Router,
              private readonly route: ActivatedRoute) {
    this.inProgress = true;
  }
  updateView(data: any[] | undefined, updateCache = true) {
    const fields = ['name', 'address', 'category', 'state'];
    this.storeService.addCache('VENUE', data);
    this.data = data;
    this.header = [
      'Name', 'Category', 'State', 'Discount', 'Address', 'Phone', 'Lat', 'Lng', 'Photo'
    ];
    this.subscription = this.storeService.query().subscribe( (x: any) => {
      this.lookUp(x?.value, fields);
    });
  }
  async ngOnInit() {
    const fields = ['name', 'address', 'category', 'state'];
    const data: any[] = this.storeService.readCache('VENUE');
    if (!data) {
      alert('>> SEARCH VENUE')
      await this.venueService.loadVenues((data) => {
        this.updateView(data);
      });
      return;
    }
    this.data = data;
    this.header = [
       'Name', 'Category', 'State', 'Discount', 'Address', 'Phone', 'Lat', 'Lng', 'Photo'
    ];
    this.subscription = this.storeService.query().subscribe( (x: any) => {
      this.lookUp(x?.value, fields);
    });
  }
  lookUp(value: string, fields: string[]) {
    const cache = this.storeService.readCache('VENUE');
    const kw = value.split(' ');
    const data = cache?.filter((x: any) => {
      let res = false;
      kw.map( (k) => {
        fields.map((v) => {
          res = res || x[v].toLowerCase().includes(k)
        })
      })
      return res;
    });
    this.data = data;
  }
  select(event: any) {
    const { value } = event;
    console.log('>> VALUE', value);
    this.router.navigate(['../detail'], { relativeTo: this.route })
  }
}
