import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from './services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collapse$: Observable<any> | undefined;
  sideBarMinimized: boolean | undefined;
  expanded: boolean | undefined;
  notification: Observable<any> | undefined;
  constructor(private readonly storeService: StoreService) {
    this.collapse$ = new Observable<any>();
    this.notification = new Observable<any>();
  }
  ngOnInit(): void {
    this.collapse$?.subscribe((data) => {
      alert('>> DATA' + data);
    })
  }
  search(evt: any) {
    const { value } = evt;
    this.storeService.publish({ value })
  }

  onScroll(){
    console.log('scrolled');
    
  }
}
