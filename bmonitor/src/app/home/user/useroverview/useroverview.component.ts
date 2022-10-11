import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-useroverview',
  templateUrl: './useroverview.component.html',
  styleUrls: ['./useroverview.component.css']
})
export class UseroverviewComponent implements OnInit {
  profiles:any[] | undefined;
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }
  ngOnInit(): void {
    this.profiles = [
      {name: 'USER_1', age: 40, swipe: 2, liked: 1 , connection: 2},
      {name: 'USER_2', age: 23, swipe: 20, liked: 4 , connection: 24},
      {name: 'USER_3', age: 55, swipe: 62, liked: 3 , connection: 23},
      {name: 'USER_4', age: 25, swipe: 32, liked: 10 , connection: 45},
      {name: 'USER_1', age: 40, swipe: 2, liked: 1 , connection: 2},
      {name: 'USER_2', age: 23, swipe: 20, liked: 4 , connection: 24},
      {name: 'USER_3', age: 55, swipe: 62, liked: 3 , connection: 23},
      {name: 'USER_4', age: 25, swipe: 32, liked: 10 , connection: 45},
      {name: 'USER_1', age: 40, swipe: 2, liked: 1 , connection: 2},
      {name: 'USER_2', age: 23, swipe: 20, liked: 4 , connection: 24},
      {name: 'USER_3', age: 55, swipe: 62, liked: 3 , connection: 23},
      {name: 'USER_4', age: 25, swipe: 32, liked: 10 , connection: 45},
      {name: 'USER_1', age: 40, swipe: 2, liked: 1 , connection: 2},
      {name: 'USER_2', age: 23, swipe: 20, liked: 4 , connection: 24},
      {name: 'USER_3', age: 55, swipe: 62, liked: 3 , connection: 23},
      {name: 'USER_4', age: 25, swipe: 32, liked: 10 , connection: 45},
    ]
  }
  showProfileDetail(profile: any) {
    this.router.navigate(['../detail'], { relativeTo: this.route })
  }

}
