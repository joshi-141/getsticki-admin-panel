import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {
  @Input() profile: any;

  constructor() { }
  ngOnInit(): void {
  }
}
