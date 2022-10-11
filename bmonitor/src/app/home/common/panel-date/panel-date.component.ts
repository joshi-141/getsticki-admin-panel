import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-date',
  templateUrl: './panel-date.component.html',
  styleUrls: ['./panel-date.component.css']
})
export class PanelDateComponent implements OnInit {
 options:  any[] | undefined;
 menu:  any[] | undefined;
  constructor() { }

  ngOnInit(): void {
    this.options = [
      { name: 'item1' },
      { name: 'item2' }
    ];
    this.menu = [
      { name: 'Venue 1', number: 3 },
      { name: 'Venue 2' },
      { name: 'Venue 3' },
      { name: 'Venue 4' },
      { name: 'Venue 1' },
      { name: 'Venue 2' },
      { name: 'Venue 3' },
      { name: 'Venue 4' }
    ]
  }

}
