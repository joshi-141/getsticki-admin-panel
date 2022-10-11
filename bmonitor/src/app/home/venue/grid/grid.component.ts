import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {StoreService} from '../../services/store.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  venues: any[] | undefined;
  partner: number | undefined;
  total: number | undefined;
  other: number | undefined;
  cache: any[] | undefined;
  categories: any[] | undefined;
  subscription: Subscription | undefined;
  inProgress: boolean | undefined;
  constructor(private readonly api: ApiService, private readonly storeService: StoreService) {
    this.partner = 0;
    this.inProgress = true;
  }
  async ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  async ngOnInit() {
    const fields = ['name', 'address', 'category', 'state'];
    this.subscription = this.storeService.query().subscribe( (x: any) => {
      this.lookUp(x?.value, fields);
    });
    await this.api.loadVenues((data) => {
      if (!data) return;
      this.updateView(data);
    });
  }
  updateView(data: any[] | undefined, updateCache = true) {
    this.inProgress = false;
    let count = 0;
    let other = 0;
    const cats: any = {};
    if (updateCache && this.cache) {
      this.venues = [...this.cache];
    }
    this.total = data?.length;
    const res = data?.map((x:any) => {
      if (x.partner) {
        count++;
      } else {
        other++;
      }
      const total = cats[x.category.toUpperCase()];
      const newTotal = total ? total + 1 : 1;
      cats[x.category.toUpperCase()] = newTotal;
      const name = x.name.substring(0, 18);
      const visible = true ;
      return {...x, name, visible }
    });
    this.categories = Object.keys(cats).map((x) => {
      return { name: x.split(' ')[0], total: cats[x], fullName: x.toLowerCase()}
    });
    this.categories.sort((a: any,b: any) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    this.partner = count;
    this.other = other;
    res?.sort( (a:any,b:any) => { return a.discount < b.discount ? 1 : -1 })
    if (!res)
      return;
    if (updateCache) {
      this.cache = [...res];
      this.storeService.addCache('VENUE', this.cache);

    }
    this.venues = [...res];
  }
  firstLetter(s: string) {
    return s.charAt(0).toUpperCase();
  }
  show(option: string) {
    if (option === 'all') {
      this.cache = this.cache?.map((x) => {
        return { ...x, visible: true}
      })
    }
    if (option === 'partner') {
      this.cache = this.cache?.map((x) => {
        return { ...x, visible: x.discount > 0}
      });
    }
    this.venues = this.cache;
  }
  lookUp(value: string, fields: string[]) {
    const kw = value.split(' ');
    const data = this.cache?.filter((x) => {
      let res = false;
      kw.map( (k) => {
        fields.map((v) => {
          res = res || x[v].toLowerCase().includes(k)
        })
      })
     return res;
    });
    this.updateView(data, false);
  }
}
