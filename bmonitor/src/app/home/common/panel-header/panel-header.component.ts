import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent implements OnInit {
  @Output() collapse = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();
  pattern: any | undefined;
  sideBarMinimized: boolean | undefined;
  expanded: boolean | undefined;
  constructor() {
  }

  ngOnInit(): void {
    this.pattern = { value: '' };
  }
  minimizeBar() {
    this.sideBarMinimized = !this.sideBarMinimized;
    this.expanded = false;
    this.collapse.emit({ state: this.sideBarMinimized });
  }
  lookUp() {
    this.search.emit(this.pattern);
  }
  change() {
    alert('>> CHANGE ' + this.pattern.value)
  }

  logout(){
    return localStorage.removeItem("access_token");
  }
}
