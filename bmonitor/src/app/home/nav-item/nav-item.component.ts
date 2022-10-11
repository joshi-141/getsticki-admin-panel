import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() list: any[] | undefined;
  @Input() name: string | undefined;
  expanded: boolean | undefined;
  constructor() {
    this.expanded = false;
  }

  ngOnInit(): void {
  }
  openClose() {
    this.expanded = !this.expanded;
  }
  selectComponent(url: string) {

  }
}
