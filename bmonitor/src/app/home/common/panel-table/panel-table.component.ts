import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {
  @Input() header: any[] | undefined;
  @Input() data: any[] | undefined;
  @Output() select = new EventEmitter<any>();
  constructor() { }
  ngOnInit(): void {
  }
  index(item: any) {
    return item?.name.charAt(0);
  }
  selectItem(item: any) {
    this.select.emit({ value: item });
  }
}
