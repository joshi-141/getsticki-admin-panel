import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  eventRepos: any | undefined;
  cache: any | undefined;

  constructor() {
    this.cache = {};
    this.eventRepos = { obs: new Subject()};
  }
  query(): Observable<any> {
    return this.eventRepos.obs;
  }
  publish(event: any) {
    this.eventRepos.obs.next(event);
  }
  remove(event: any) {
    this.eventRepos.obs.next(event);
  }
  addCache(key: string, value: any[] | undefined) {
    this.cache[key] = value;
  }
  readCache(key: string) {
    return this.cache[key];
  }
}
